# API Reference

This document provides details on the API endpoints available in the ExcellenceTraining project.

## Base URL

The API is accessible at the same domain as the frontend, with endpoints prefixed with `/api`.

## Endpoints

### Get Testimonials

Retrieves a list of client testimonials.

- **URL**: `/api/testimonials`
- **Method**: `GET`
- **Response**: 
  ```json
  [
    {
      "id": 1,
      "author": "Jane Smith",
      "position": "CEO",
      "company": "Tech Innovations Inc.",
      "content": "Working with ExcellenceTraining transformed our leadership team...",
      "rating": 5,
      "imageUrl": "https://example.com/images/jane-smith.jpg"
    },
    // more testimonials...
  ]
  ```

### Get Programs

Retrieves a list of training programs.

- **URL**: `/api/programs`
- **Method**: `GET`
- **Response**: 
  ```json
  [
    {
      "id": 1,
      "title": "Leadership Excellence",
      "description": "Develop effective leaders capable of inspiring teams...",
      "features": ["Executive Leadership Training", "Change Management", "Strategic Decision Making"],
      "imageUrl": "https://example.com/images/leadership.jpg"
    },
    // more programs...
  ]
  ```

### Get Events

Retrieves a list of upcoming events.

- **URL**: `/api/events`
- **Method**: `GET`
- **Response**: 
  ```json
  [
    {
      "id": 1,
      "title": "Strategic Leadership Summit",
      "description": "Join industry leaders for a day of insights and networking...",
      "date": "2023-06-15T09:00:00Z",
      "location": "Grand Hotel Conference Center, New York",
      "isVirtual": false
    },
    // more events...
  ]
  ```

### Submit Contact Form

Submits a contact form message.

- **URL**: `/api/contact`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "company": "Acme Corporation",
    "phone": "+1234567890",
    "message": "I'm interested in learning more about your leadership programs."
  }
  ```
- **Response**:
  - Success (200 OK):
    ```json
    {
      "success": true,
      "message": "Your message has been received. We'll be in touch soon."
    }
    ```
  - Error (400 Bad Request):
    ```json
    {
      "success": false,
      "errors": [
        {
          "path": ["email"],
          "message": "Please enter a valid email address"
        }
      ]
    }
    ```

### Subscribe to Newsletter

Subscribes an email address to the newsletter.

- **URL**: `/api/subscribe`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com"
  }
  ```
- **Response**:
  - Success (200 OK):
    ```json
    {
      "success": true,
      "message": "Thank you for subscribing to our newsletter!"
    }
    ```
  - Error (400 Bad Request):
    ```json
    {
      "success": false,
      "errors": [
        {
          "path": ["email"],
          "message": "Please enter a valid email address"
        }
      ]
    }
    ```
  - Error (409 Conflict):
    ```json
    {
      "success": false,
      "message": "This email is already subscribed to our newsletter."
    }
    ```

## Error Handling

The API uses standard HTTP status codes to indicate success or failure:

- `200 OK`: Request succeeded
- `400 Bad Request`: Validation error or malformed request
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource already exists (e.g., duplicate email subscription)
- `500 Internal Server Error`: Server error

Error responses follow this format:
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "path": ["field_name"],
      "message": "Field-specific error message"
    }
  ]
}
```

The `errors` array is only present for validation errors and contains information about which fields failed validation.

## Implementation Details

The API endpoints are defined in `server/routes.ts` and use Express.js for routing.

### Validation

All API endpoints that accept request bodies use Zod schemas for validation:

```typescript
// Example validation
app.post('/api/contact', async (req, res) => {
  try {
    // Validate request body against schema
    const validatedData = contactFormSchema.parse(req.body);
    
    // Process validated data
    await storage.saveContactMessage(validatedData);
    
    return res.json({
      success: true,
      message: "Your message has been received. We'll be in touch soon."
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.errors
      });
    }
    
    console.error('Error saving contact message:', error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request."
    });
  }
});
```

### Data Access

The API uses the `storage` module (`server/storage.ts`) to interact with the database:

```typescript
// Example data access
export const storage = {
  async getTestimonials() {
    return db.query.testimonials.findMany({
      orderBy: desc(testimonials.rating)
    });
  },
  
  async saveContactMessage(message: ContactFormValues) {
    const [newMessage] = await db.insert(contactMessages)
      .values(message)
      .returning();
    return newMessage;
  }
};
```

## Frontend Integration

The frontend uses the `apiRequest` function from `client/src/lib/queryClient.ts` to interact with the API:

```typescript
// Example API request from frontend
const { data, isLoading } = useQuery({
  queryKey: ['/api/programs'],
});

// Example mutation
const mutation = useMutation({
  mutationFn: (data: ContactFormValues) => 
    apiRequest('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  onSuccess: () => {
    // Handle success
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  },
  onError: () => {
    // Handle error
    toast({
      title: "Error",
      description: "There was a problem sending your message. Please try again.",
      variant: "destructive",
    });
  }
});

// Submit form data
mutation.mutate(formData);
```