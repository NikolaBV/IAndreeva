using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService
    {
        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mJjD3VwtAHCLbekuxTPYQ4ZhBscEpWUzF8d2g6N9XSG7r5MKRv" +
                                "MF9edS6ytCX8AxrpvmzNgaqUZu2KT4H7GjcsQ5kfVnYEwRWBLh" +
                                "PYMFxeQtXwmK94CLyJ7WEaSU6fuGjvb5Hr2Azq8VZg3pTRnckB" +
                                "E5feFXj3WcTqPumJZCGUH4yxtar8SD2NL7YwzBps6QkbndAVvK" +
                                "E5feFXj3WcTqPumJZCGUH4yxtar8SD2NL7YwzBps6QkbndAVvK" +
                                "hW7TGym5wZQJMBz3XNKEuRpxPnDFVg2ajLs49Y8dSkUHvCrt6f"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}