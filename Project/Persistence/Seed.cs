using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
        UserManager<AppUser> userManager,
        RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.Roles.Any())
            {
                await roleManager.CreateAsync(new IdentityRole("Admin"));
                await roleManager.CreateAsync(new IdentityRole("User"));
            }
            if (!userManager.Users.Any())
            {
                var regularUser = new AppUser
                {
                    DisplayName = "Koko",
                    UserName = "NikolaBV",
                    Email = "nikolavalkovb@gmail.com"
                };
                var adminUser = new AppUser
                {
                    DisplayName = "Ivana",
                    UserName = "IvanaAndreeva",
                    Email = "ivanandrv@gmail.com"
                };

                await userManager.CreateAsync(adminUser, "Pa$$w0rd");
                await userManager.CreateAsync(regularUser, "regulerU$3r");

                await userManager.AddToRoleAsync(adminUser, "Admin");
                await userManager.AddToRoleAsync(regularUser, "User");

            }
            if (context.Posts.Any()) return;

            var posts = new List<Post>
            {
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Introduction to C#",
                    HtmlContent = "<p>Welcome to the world of C#!</p>",
                    Description = "A beginner's guide to getting started with C# programming language.",
                    CreatedAt = new DateTime(2024, 1, 1),
                    UpdatedAt = new DateTime(2024, 1, 2)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Understanding .NET Core",
                    HtmlContent = "<p>.NET Core is a cross-platform version of .NET.</p>",
                    Description = "Learn about the fundamentals of .NET Core and its cross-platform capabilities.",
                    CreatedAt = new DateTime(2024, 1, 3),
                    UpdatedAt = new DateTime(2024, 1, 4)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Getting Started with ASP.NET",
                    HtmlContent = "<p>Learn how to build web applications with ASP.NET.</p>",
                    Description = "An introduction to web development using ASP.NET framework.",
                    CreatedAt = new DateTime(2024, 1, 5),
                    UpdatedAt = new DateTime(2024, 1, 6)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Entity Framework Core Basics",
                    HtmlContent = "<p>Entity Framework Core is an ORM for .NET.</p>",
                    Description = "A guide to understanding and using Entity Framework Core as an ORM in .NET applications.",
                    CreatedAt = new DateTime(2024, 1, 7),
                    UpdatedAt = new DateTime(2024, 1, 8)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Understanding Dependency Injection",
                    HtmlContent = "<p>Dependency Injection is a design pattern for managing dependencies.</p>",
                    Description = "Explore the principles and practices of Dependency Injection in software design.",
                    CreatedAt = new DateTime(2024, 1, 9),
                    UpdatedAt = new DateTime(2024, 1, 10)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Introduction to LINQ",
                    HtmlContent = "<p>LINQ provides a consistent way to query data.</p>",
                    Description = "An overview of LINQ, its syntax, and how it can be used to query various data sources.",
                    CreatedAt = new DateTime(2024, 1, 11),
                    UpdatedAt = new DateTime(2024, 1, 12)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Handling Errors in C#",
                    HtmlContent = "<p>Learn how to handle exceptions in C#.</p>",
                    Description = "A comprehensive guide to error handling and exception management in C#.",
                    CreatedAt = new DateTime(2024, 1, 13),
                    UpdatedAt = new DateTime(2024, 1, 14)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Unit Testing in .NET",
                    HtmlContent = "<p>Unit testing ensures code reliability and correctness.</p>",
                    Description = "Introduction to unit testing in .NET, focusing on best practices and tools.",
                    CreatedAt = new DateTime(2024, 1, 15),
                    UpdatedAt = new DateTime(2024, 1, 16)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Asynchronous Programming in C#",
                    HtmlContent = "<p>Async and await keywords simplify asynchronous programming.</p>",
                    Description = "Learn the concepts and practices of asynchronous programming in C#.",
                    CreatedAt = new DateTime(2024, 1, 17),
                    UpdatedAt = new DateTime(2024, 1, 18)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Working with JSON in .NET",
                    HtmlContent = "<p>JSON is a popular data interchange format.</p>",
                    Description = "Understand how to work with JSON data in .NET applications.",
                    CreatedAt = new DateTime(2024, 1, 19),
                    UpdatedAt = new DateTime(2024, 1, 20)
                }
            };
            await context.Posts.AddRangeAsync(posts);
            await context.SaveChangesAsync();
        }
    }
}
