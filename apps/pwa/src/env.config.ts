// TODO: Validate types with Zod
const {
  AWS_ACCESS_KEY_ID: aws_access_key_id,
  AWS_SECRET_ACCESS_KEY: aws_secret_access_key,
  AWS_REGION: aws_region,
  DYNAMODB_TABLE_NAME: table_name,
} = process.env;

export const envConfig = {
  aws_access_key_id,
  aws_secret_access_key,
  aws_region,
  table_name,
};
