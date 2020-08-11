const { nexusSchemaPrisma } = require('nexus-plugin-prisma/schema')
const { idArg, makeSchema, objectType, stringArg, booleanArg, intArg } = require('@nexus/schema')


{{#each schema}}

const {{{this.id}}} = objectType({
  name: '{{{this.id}}}',
  definition(t) {
    t.model.id()
    {{#each this.fields}}
      t.model.{{{this.name}}}()
    {{/each}}
    {{#each this.children}}
      t.model.{{{this.id}}}({
        pagination : false
      })
    {{/each}}
    {{#each this.parents}}
      t.model.{{{this.id}}}()
    {{/each}}
  },
})

{{/each}}


const Query = objectType({
  name: 'Query',
  definition(t) {
    {{#each model}}
    t.crud.{{{this._id}}}()
    {{/each}}

    {{#each model}}

    t.field('findOne{{{this.id}}}', {
      type: '{{{this.id}}}',
      args: {
        id: intArg({ nullable: true }),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.{{{this._id}}}.findOne({
          where: { id : args.id },
        })
      },
    })

    t.list.field('findMany{{{this.id}}}', {
      type: '{{{this.id}}}',
      resolve: (_, args, ctx) => {
        return ctx.prisma.{{{this._id}}}.findMany()
      },
    })

    {{/each}}
  },
})



const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    // t.crud.createOneUser({ alias: 'signupUser' })
    // t.crud.deleteOnePost()

  {{#each model}}

    t.field('create{{{this.id}}}', {
      type: '{{{this.id}}}',
      args: {
        {{#each this.fields}}
          {{this.name}}: {{this._type}}Arg({{#if this.options.required}} { nullable: false } {{/if}}),
        {{/each}}
        {{#each this.parents}}
          {{this.id}}Id: intArg({{#if this.required}} { nullable: false } {{/if}}),
        {{/each}}
      },
      resolve: (_, { {{#each this.fields}} {{{this.name}}}, {{/each}} {{#each this.parents}} {{{this.id}}}Id {{#unless @last}},{{/unless}} {{/each}} }, ctx) => {
        return ctx.prisma.{{this._id}}.create({
          data: {
            {{#each this.fields}}
            {{{this.name}}},
            {{/each}}
            {{#each this.parents}}
              {{{this.id}}}: {
                connect: { id: {{this.id}}Id },
              },
            {{/each}}
          },
        })
      },
    })

    t.field('update{{{this.id}}}', {
      type: '{{{this.id}}}',
      nullable: true,
      args: {
        id: intArg(),
        {{#each this.fields}}
          {{{this.name}}}: {{{this._type}}}Arg(),
        {{/each}}
        {{#each this.parents}}
          {{{this.id}}}Id: intArg(){{#unless @last}},{{/unless}}
        {{/each}}
      },
      resolve: (_, args, ctx) => {
        {{#each this.parents}}
        if (args.{{{this.id}}}Id) {
            args.{{{this.id}}} = {
              connect: { id : args.{{{this.id}}}Id }
            }
            delete args.{{{this.id}}}Id
        }
        {{/each}}
        return ctx.prisma.{{{this._id}}}.update({
          where: { id: args.id },
          data: args
        })
      },
    })

    {{/each}}
  },
})




const schema = makeSchema({
  types: [Query, Mutation, {{#each model}} {{{this.id}}}{{#unless @last}},{{/unless}} {{/each}}],
  plugins: [nexusSchemaPrisma()],
//   plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})

module.exports = {
  schema
}