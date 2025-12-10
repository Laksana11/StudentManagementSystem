using System.Net;
using System.Text.Json;

namespace StudentManagement.API.Middleware;

public class GlobalExceptionHandler
{
    private readonly RequestDelegate _next;
    private static ILogger<GlobalExceptionHandler> _logger = null!;

    public GlobalExceptionHandler(RequestDelegate next, ILogger<GlobalExceptionHandler> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        _logger.LogError(exception, "An unhandled exception occurred");
        
        Console.WriteLine($"===== ERROR DETAILS =====");
        Console.WriteLine($"ERROR: {exception.Message}");
        Console.WriteLine($"TYPE: {exception.GetType().Name}");
        Console.WriteLine($"========================");

        context.Response.ContentType = "application/json";

        if (exception is InvalidOperationException)
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            
            var badRequestResponse = new
            {
                success = false,
                message = exception.Message
            };

            return context.Response.WriteAsJsonAsync(badRequestResponse);
        }

        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        var response = new
        {
            success = false,
            message = "An internal server error occurred"
        };

        return context.Response.WriteAsJsonAsync(response);
    }
}
