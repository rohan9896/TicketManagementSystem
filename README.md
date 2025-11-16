// Ticket management system

// views - list of tickets
// ticket detail view
// title, desc, comment, assignee, due date
// ticket data from mock api

1. Tech stack

- React
- Typescript
- Chakra UI
- React Router v6
- Json server

2. Components -

- Navbar
- Ticket Card
- Ticket List
- Ticket
- comment

3. Pages

- Layout
- Ticket View

4. Api Contracts

- /api/tickets - GET
- /api/tickets/:id - GET
- /api/tickets - POST
- /api/tickets/:id/comments - GET
- /api/tickets/:id/comments - POST
- /api/tickets/:id/assign - POST {to: <user_id>}

5. Data Objects(Entities)

- User
- Ticket
- Comment

6. Future Enhancements

- Add Pagination in ticket view
- use React-query for calling apis and for server state caching
- User based authentication
- Comments section enhancements. eg - like functionality, Reply to comments(nested comments)
