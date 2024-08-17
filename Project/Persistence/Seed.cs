using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Posts.Any()) return;

            var posts = new List<Post>
            {
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Introduction to C#",
                    HtmlContent = "<p>Welcome to the world of C#!</p>",
                    CreatedAt = new DateTime(2024, 1, 1),
                    UpdatedAt = new DateTime(2024, 1, 2)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Understanding .NET Core",
                    HtmlContent = "<p>.NET Core is a cross-platform version of .NET.</p>",
                    CreatedAt = new DateTime(2024, 1, 3),
                    UpdatedAt = new DateTime(2024, 1, 4)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Getting Started with ASP.NET",
                    HtmlContent = "<p>Learn how to build web applications with ASP.NET.</p>",
                    CreatedAt = new DateTime(2024, 1, 5),
                    UpdatedAt = new DateTime(2024, 1, 6)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Entity Framework Core Basics",
                    HtmlContent = "<p>Entity Framework Core is an ORM for .NET.</p>",
                    CreatedAt = new DateTime(2024, 1, 7),
                    UpdatedAt = new DateTime(2024, 1, 8)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Understanding Dependency Injection",
                    HtmlContent = "<p>Dependency Injection is a design pattern for managing dependencies.</p>",
                    CreatedAt = new DateTime(2024, 1, 9),
                    UpdatedAt = new DateTime(2024, 1, 10)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Introduction to LINQ",
                    HtmlContent = "<p>LINQ provides a consistent way to query data.</p>",
                    CreatedAt = new DateTime(2024, 1, 11),
                    UpdatedAt = new DateTime(2024, 1, 12)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Handling Errors in C#",
                    HtmlContent = "<p>Learn how to handle exceptions in C#.</p>",
                    CreatedAt = new DateTime(2024, 1, 13),
                    UpdatedAt = new DateTime(2024, 1, 14)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Unit Testing in .NET",
                    HtmlContent = "<p>Unit testing ensures code reliability and correctness.</p>",
                    CreatedAt = new DateTime(2024, 1, 15),
                    UpdatedAt = new DateTime(2024, 1, 16)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Asynchronous Programming in C#",
                    HtmlContent = "<p>Async and await keywords simplify asynchronous programming.</p>",
                    CreatedAt = new DateTime(2024, 1, 17),
                    UpdatedAt = new DateTime(2024, 1, 18)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Working with JSON in .NET",
                    HtmlContent = "<p>JSON is a popular data interchange format.</p>",
                    CreatedAt = new DateTime(2024, 1, 19),
                    UpdatedAt = new DateTime(2024, 1, 20)
                }
            };
            await context.Posts.AddRangeAsync(posts);
            await context.SaveChangesAsync();
        }
    }
}