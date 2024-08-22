using Application.Posts;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class PostsController : BaseAPIController
    {
        [HttpGet]
        public async Task<ActionResult<List<Post>>> GetPosts()
        {
            return await Mediator.Send(new List.Query());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }
        [HttpPost]
        public async Task<IActionResult> CreatePost(Post post)
        {
            await Mediator.Send(new Create.Command { Post = post });
            return Ok(post.Id);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditPost(Guid id, Post post)
        {
            post.Id = id;
            await Mediator.Send(new Edit.Command { Post = post });
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(Guid id)
        {
            await Mediator.Send(new Delete.Command { Id = id });
            return Ok();
        }

    }
}