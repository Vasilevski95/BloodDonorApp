using DotNetEnv; // Ensure DotNetEnv package is installed
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

builder.Configuration.AddEnvironmentVariables();

var corsOrigins = Environment.GetEnvironmentVariable("CORS_ORIGINS")?.Split(",") ?? [];

builder.Services.AddControllers();

builder.Services.AddDbContext<DonationDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("SpecificOrigin", policyBuilder =>
    {
        policyBuilder
            .WithOrigins(corsOrigins) 
            .AllowAnyMethod() 
            .AllowAnyHeader(); 
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("SpecificOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();
