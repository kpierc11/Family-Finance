var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();

// Step 1: Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowLocalhost3000", policy =>
    {
        policy.WithOrigins("http://localhost:3000")  // Allow your Next.js frontend
              .AllowAnyHeader()                    // Allow any header
              .AllowAnyMethod();                   // Allow any HTTP method (GET, POST, etc.)
    });
});

var app = builder.Build();

// Step 2: Apply CORS middleware before any other middleware
app.UseCors("AllowLocalhost3000");  // Apply CORS policy

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Define WeatherForecast data
var summaries = new[] { "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching" };

// Step 3: Define a GET endpoint
app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.MapGet("/hello", () =>
{
    string hello = "hello";

    return hello;
}).WithName("GetHello");


app.Run();

// WeatherForecast record definition
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
