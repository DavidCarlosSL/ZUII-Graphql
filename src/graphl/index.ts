import { buildSchemaSync } from "type-graphql";

import container from "../services/container";

import UserResolvers from "./resolvers/user.resolver";

import UserSchema from "./schemas/user.schema";

const schema = buildSchemaSync({
    resolvers: [UserSchema, UserResolvers],
    container: container
})

export default schema;