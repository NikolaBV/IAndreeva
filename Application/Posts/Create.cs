using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>> //We are not returning anything so we use Unit
        {
            public Post Post { get; set; } //What we will recieve as a parameter from the API
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Post).SetValidator(new PostValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>> //Since the command doesnt return anything we don't need a second parameter
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Posts.Add(request.Post);
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create post");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}