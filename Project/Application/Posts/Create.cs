using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class Create
    {
        public class Command : IRequest
        {
            public Post Post { get; set; } //What we will recieve as a parameter from the API
        }

        public class Handler : IRequestHandler<Command> //Since the command doesnt return anything we don't need a second parameter
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Posts.Add(request.Post);
                await _context.SaveChangesAsync();
            }
        }
    }
}