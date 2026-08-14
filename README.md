# Portfolio Frontend

This React + Vite frontend is prepared to connect to a Spring Boot backend.

## Environment configuration

Create a .env file in the project root with:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## Backend expectation

The frontend expects your Spring Boot API to expose a POST endpoint at:

```http
POST /api/contact
Content-Type: application/json
```

Example request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello from the portfolio contact form."
}
```

Example Spring Boot controller snippet:

```java
@PostMapping("/contact")
public ResponseEntity<Map<String, String>> contact(@RequestBody ContactRequest request) {
    return ResponseEntity.ok(Map.of("message", "Message received"));
}
```

## Development

```bash
npm install
npm run dev
```
