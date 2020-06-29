# Serverless Websocket Demo

Example `serverless.yml`

```yaml
service: serverless-websocket-demo

provider:
  name: aws
  runtime: nodejs12.x

  stage: ${opt:stage}
  region: us-east-1

  iamRoleStatements:
    - Effect: Allow
      Action:
        - "execute-api:ManageConnections"
      Resource:
        - "arn:aws:execute-api:*:*:**/@connections/*"
    - Effect: Allow
      Action:
        - "dynamodb:PutItem"
        - "dynamodb:GetItem"
        - "dynamodb:UpdateItem"
        - "dynamodb:DeleteItem"
        - "dynamodb:Query"
        - "dynamodb:Scan"
      Resource:
        - Fn::GetAtt: [ConnectionsTable, Arn]
        - Fn::Join:
            - "/"
            - - Fn::GetAtt: [ConnectionsTable, Arn]
              - "*"

  stackName: serverless-websocket-demo-${opt:stage}

  environment:
    NODE_ENV: ${opt:stage}
    DYNAMODB_CONNECTIONS_TABLE:
      Ref: ConnectionsTable

  websocketApiName: serverless-websocket-demo-websocket-${opt:stage}
  websocketApiRouteSelectionExpression: $request.body.action

functions:
  connections:
    handler: socket.connections
    events:
      - websocket:
          route: $connect
      - websocket:
          route: $disconnect
  default:
    handler: socket.default
    events:
      - websocket:
          route: $default
  action1:
    handler: socket.action1
    events:
      - websocket:
          route: action1

  action2:
    handler: socket.action2
    events:
      - websocket:
          route: action2

resources:
  Resources:
    ConnectionsTable:
      Type: AWS::DynamoDB::Table
      Properties:
        AttributeDefinitions:
          - AttributeName: connectionId
            AttributeType: S
        KeySchema:
          - AttributeName: connectionId
            KeyType: HASH
        BillingMode: PAY_PER_REQUEST

```
