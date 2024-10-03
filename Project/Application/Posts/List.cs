using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<Post>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<Post>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<PagedList<Post>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Posts.OrderBy(d => d.CreatedAt).AsQueryable();
                return Result<PagedList<Post>>.Success(
                    await PagedList<Post>.CreateAsync(query, request.Params.PageNumber,
                    request.Params.PageSize)
                );
            }
        }
    }
}