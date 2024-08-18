using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class Details
    {
        public class Query : IRequest<Post>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Post>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public Task<Post> Handle(Query request, CancellationToken cancellationToken)
            {
                return _context.Posts.FindAsync(request.Id, cancellationToken).AsTask();
            }
        }
    }
}