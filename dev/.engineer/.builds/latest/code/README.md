# NodeJS REST API template API Documentation

- [FormSpace API REST API Documentation](#formspace-api-rest-api-documentation)
  * [Host](#host)
  * [Headers](#headers)
- [Models](#models)
  * [Organization](#organization)
    + [organization model](#organization-model)
  * [Session](#session)
    + [session model](#session-model)
  * [Organization](#organization)
    + [Organization model](#organization-model)
  * [User](#user)
    + [User model](#user-model)
      - [User parent models](#user-parent-models)
      - [User child models](#user-child-models)
  * [App](#app)
    + [App model](#app-model)
      - [App parent models](#app-parent-models)
      - [App child models](#app-child-models)
  * [AppLog](#app_log)
    + [AppLog model](#app_log-model)
      - [AppLog parent models](#app_log-parent-models)
- [Predefined values](#predefined-values)
  * [LogAction enum](#logaction-enum)
  * [UserType enum](#usertype-enum)
- [Queries](#queries)
  * [Query string parameters](#query-string-parameters)
    + [Sorting](#prisma-sorting)
    + [Filtering](#prisma-filtering)
    + [selecting](#prisma-selecting)

## Host
> http://localhost:3000

## Headers
Header | Value | Description
------------ | ------------- | -------------
Authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25JZCI6MiwibmFtZSI6IkdhbGVubyJ9.M7aiCB-TY9-BzPkk0zN5jsXJMHbbqoXT-zjehyOtMuw |  JWT generated through this APIs authentication endpoint
Content-Type | application/json | Requests body must be JSON

# Models

## Organization
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/organization | Find many profile | Organization | N/A
GET | /api/organization/:id | Find one profile | [[Organization](#organization-model)] | N/A
GET | /api/organization/:id | Find one profile | [[Organization](#organization-model)] | N/A
POST | /api/organization | Create organization | Organization | [Organization](#organization-model) or [[Organization](#organization-model)]
PUT | /api/organization/:id | Edit organization | Organization | [Organization](#organization-model) or [Organization](#organization-model) or [[Organization](#organization-model)]
DELETE | /api/organization/:id | Delete organization | Organization | [Organization](#organization-model)

### organization model
```
model Organization {
  id    String    @default(uuid()) @id
  createdAt DateTime    @default(now()) 
  title String
  description String?
  logo String?
  user User[]
}
```

## Session
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/session | Find many profile | Session | N/A
GET | /api/session/:id | Find one profile | [[Session](#session-model)] | N/A
POST | /api/session | Create session | Session | [Session](#session-model) or [[Session](#session-model)]
PUT | /api/session/:id | Edit session | Session | [Session](#session-model) or [Session](#session-model) or [[Session](#session-model)]
DELETE | /api/session/:id | Delete session | Session | [Session](#session-model)

### session model
```
model Session {
  access_token          String
  createdAt             DateTime @default(now())
  device                String?
  device_info           String?
  id                    String   @id @default(uuid())
  id_token              String
  ip                    String?
  isAlive               Boolean
  refresh_token         String
  refresh_token_expires String?
  userId                String
  user                  User     @relation(fields: [userId], references: [id])
}
```

## Organization
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/organization | Find many organization | Organization | N/A
GET | /api/organizationCount | Count organization | [[Organization](#organization-model)] | N/A
GET | /api/organization/:id | Find one organization | [[Organization](#organization-model)] | N/A
POST | /api/organization | Create organization | Organization | [Organization](#organization-model) or [[Organization](#organization-model)]
PUT | /api/organization/:id | Update organization | Organization | [Organization](#organization-model) or [[Organization](#organization-model)]
DELETE | /api/organization/:id | Delete organization | Organization | [Organization](#organization-model)

### organization model
```
model Organization {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    title String   
    description String?   
    logo String?   
}
```



## User
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/user | Find many user | User | N/A
GET | /api/userCount | Count user | [[User](#user-model)] | N/A
GET | /api/user/:id | Find one user | [[User](#user-model)] | N/A
GET | /api/organization/:id/user | Find user through its parent organization | [[User](#user-model)] | N/A
POST | /api/user | Create user | User | [User](#user-model) or [[User](#user-model)]
PUT | /api/user/:id | Update user | User | [User](#user-model) or [[User](#user-model)]
DELETE | /api/user/:id | Delete user | User | [User](#user-model)

### user model
```
model User {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    authId String?   
    email String  @unique 
    name String   
    picture String?   
    type UserType   
    organizationId String?
    organization  Organization?  @relation(fields: [organizationId], references: [id])
    app App[]
    session Session[]
}
```

#### user parent models

Models on which User depends on

- [Organization](#organization-model)

#### user child models

Models that depend on User

- [App](#app-model)
- [Session](#session-model)


## App
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/app | Find many app | App | N/A
GET | /api/appCount | Count app | [[App](#app-model)] | N/A
GET | /api/app/:id | Find one app | [[App](#app-model)] | N/A
GET | /api/user/:id/app | Find app through its parent user | [[App](#app-model)] | N/A
POST | /api/app | Create app | App | [App](#app-model) or [[App](#app-model)]
PUT | /api/app/:id | Update app | App | [App](#app-model) or [[App](#app-model)]
DELETE | /api/app/:id | Delete app | App | [App](#app-model)

### app model
```
model App {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    deletedAt DateTime?
    isArchived Boolean @default(false)
    title String   
    description String?   
    body Json?   
    isPublished Boolean    @default(false) 
    userId String?
    user  User?  @relation(fields: [userId], references: [id])
    app_log AppLog[]
}
```

#### app parent models

Models on which App depends on

- [User](#user-model)

#### app child models

Models that depend on App

- [AppLog](#app_log-model)


## AppLog
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/app_log | Find many app_log | AppLog | N/A
GET | /api/app_logCount | Count app_log | [[AppLog](#app_log-model)] | N/A
GET | /api/app_log/:id | Find one app_log | [[AppLog](#app_log-model)] | N/A
GET | /api/app/:id/app_log | Find app_log through its parent app | [[AppLog](#app_log-model)] | N/A
GET | /api/user/:id/app_log | Find app_log through its parent user | [[AppLog](#app_log-model)] | N/A
POST | /api/app_log | Create app_log | AppLog | [AppLog](#app_log-model) or [[AppLog](#app_log-model)]
PUT | /api/app_log/:id | Update app_log | AppLog | [AppLog](#app_log-model) or [[AppLog](#app_log-model)]
DELETE | /api/app_log/:id | Delete app_log | AppLog | [AppLog](#app_log-model)

### app_log model
```
model AppLog {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    action LogAction   
    record Json   
    appId String
    app  App  @relation(fields: [appId], references: [id])
    userId String
    user  User  @relation(fields: [userId], references: [id])
}
```

#### app_log parent models

Models on which AppLog depends on

- [App](#app-model)
- [User](#user-model)



# Predefined values


## LogAction enum

- OPEN
- DELETE
- UPDATE
- CREATE

## UserType enum

- OPERATIVO
- ADMIN
- SUPERVISOR

# Queries

This API implements [qs](https://github.com/ljharb/qs) on a middleware to parse query string parameters.  You can use [qs.Stringify](https://github.com/ljharb/qs#stringifying) on your frontend to encode your queries as strings (already implemented in API Client).  Since this project implements [Prisma.io](https://prisma.io) as client to access DB, please refer to the following docs:

## Prisma sorting

- [Prisma sorting reference](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/sorting)

## Prisma filtering

- [Prisma filtering reference](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/filtering)

## Prisma selecting

- [Prisma selecting reference](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/field-selection)