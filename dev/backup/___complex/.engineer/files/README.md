# {{app.name}} API Documentation

- [FormSpace API REST API Documentation](#formspace-api-rest-api-documentation)
  * [Host](#host)
  * [Headers](#headers)
- [Models](#models)
  * [Organization](#organization)
    + [organization model](#organization-model)
  * [Session](#session)
    + [session model](#session-model)
  {{#each model}}
  * [{{name}}](#{{id}})
    + [{{name}} model](#{{id}}-model)
      {{#if this.parents}}
      - [{{name}} parent models](#{{id}}-parent-models)
      {{/if}}
      {{#if this.children}}
      - [{{name}} child models](#{{id}}-child-models)
      {{/if}}
  {{/each}}
- [Predefined values](#predefined-values)
  {{#each enums}}
  * [{{this.name}} enum](#{{id}}-enum)
  {{/each}}
- [Queries](#queries)
  * [Query string parameters](#query-string-parameters)
    + [Sorting](#prisma-sorting)
    + [Filtering](#prisma-filtering)
    + [selecting](#prisma-selecting)

## Host
> {{app.host}}

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

{{#each model}}
## {{name}}
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/{{id}} | Find many {{id}} | {{name}} | N/A
GET | /api/{{id}}Count | Count {{id}} | [[{{name}}](#{{id}}-model)] | N/A
GET | /api/{{id}}/:id | Find one {{id}} | [[{{name}}](#{{id}}-model)] | N/A
{{#each parents}}
GET | /api/{{id}}/:id/{{../id}} | Find {{../id}} through its parent {{id}} | [[{{../name}}](#{{../id}}-model)] | N/A
{{/each}}
POST | /api/{{id}} | Create {{id}} | {{name}} | [{{name}}](#{{id}}-model) or [[{{name}}](#{{id}}-model)]
PUT | /api/{{id}}/:id | Update {{id}} | {{name}} | [{{name}}](#{{id}}-model) or [[{{name}}](#{{id}}-model)]
DELETE | /api/{{id}}/:id | Delete {{id}} | {{name}} | [{{name}}](#{{id}}-model)

### {{id}} model
```
model {{{this.name}}} {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
  {{#if this.options.softDelete}}
    deletedAt DateTime?
    {{{this.options.softDelete}}} Boolean @default(false)
  {{/if}}
  {{#each this.fields}}
    {{{this.id}}} {{{this.type}}}{{#if this.options.optional}}?{{/if}}  {{#if this.options.unique}}@unique{{/if}} {{#if this.options.default}} @default({{{this.options.default}}}) {{/if}}
  {{/each}}
  {{#each this.parents}}
    {{{this.id}}}Id String{{#if this.options.optional}}?{{/if}}
    {{{this.id}}}  {{this.name}}{{#if this.options.optional}}?{{/if}}  @relation({{#if this.options.namedRelation}}"{{{this.id}}}", {{/if}}fields: [{{this.id}}Id], references: [id])
  {{/each}}
  {{#each this.children}}
    {{#if this.options.namedRelation}}{{{this.options.namedRelation}}} {{this.name}}[] @relation("{{{this.id}}}"){{else}}{{{this.id}}} {{this.name}}[]{{/if}}
  {{/each}}
}
```

{{#if this.parents}}
#### {{id}} parent models

Models on which {{name}} depends on

{{#each this.parents}}
- [{{name}}](#{{id}}-model)
{{/each}}
{{/if}}
{{#if this.children}}

#### {{id}} child models

Models that depend on {{name}}

{{#each this.children}}
- [{{name}}](#{{id}}-model)
{{/each}}
{{/if}}


{{/each}}

# Predefined values

{{#each enums}}

## {{name}} enum

{{#each values}}
- {{this}}
{{/each}}
{{/each}}

# Queries

This API implements [qs](https://github.com/ljharb/qs) on a middleware to parse query string parameters.  You can use [qs.Stringify](https://github.com/ljharb/qs#stringifying) on your frontend to encode your queries as strings (already implemented in API Client).  Since this project implements [Prisma.io](https://prisma.io) as client to access DB, please refer to the following docs:

## Prisma sorting

- [Prisma sorting reference](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/sorting)

## Prisma filtering

- [Prisma filtering reference](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/filtering)

## Prisma selecting

- [Prisma selecting reference](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/field-selection)