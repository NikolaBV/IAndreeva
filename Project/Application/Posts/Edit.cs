using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Post Post { get; set; } //Post that will be sent from the client
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var post = await _context.Posts.FindAsync(request.Post.Id);
                _mapper.Map(request.Post, post);
                await _context.SaveChangesAsync();
            }
        }
    }
}