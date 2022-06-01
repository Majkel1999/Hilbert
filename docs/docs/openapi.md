# HilBERT Trainer API
API for HilBERT application. Project description and source code is avalible at [GitHub](https://github.com/Majkel1999/Hilbert/)

## Version: 0.0.1

### /user/

#### GET
##### Summary

Get User Info

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 401 | User not authenticated |

#### DELETE
##### Summary

Delete User

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |

### /user/login

#### POST
##### Summary

Login

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 401 | Incorrect username or password |
| 422 | Validation Error |

### /user/refresh

#### POST
##### Summary

Refresh

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 401 | Refresh token not present or expired |

### /user/register

#### POST
##### Summary

Register

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 409 | Username already exists |
| 422 | Validation Error |

### /project/

#### GET
##### Summary

Get User Projects

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 401 | User not authenticated |

#### POST
##### Summary

Create Project

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 401 | User not authenticated |
| 409 | Project already exists |
| 422 | Validation Error |

### /project/{project_id}

#### GET
##### Summary

Get Project

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| project_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 401 | User not authenticated |
| 403 | User not authorized for specific project |
| 422 | Validation Error |

#### DELETE
##### Summary

Delete Project

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| project_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 401 | User not authenticated |
| 403 | User not authorized for specific project |
| 422 | Validation Error |

### /project/{project_id}/metrics

#### GET
##### Summary

Get Project Metrics

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| project_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 401 | User not authenticated |
| 403 | User not authorized for specific project |
| 422 | Validation Error |

### /project/{project_id}/clear

#### POST
##### Summary

Clear Tags

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| project_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 401 | User not authenticated |
| 403 | User not authorized for specific project |
| 422 | Validation Error |

### /project/{project_id}/train

#### POST
##### Summary

Queue Model Training

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| project_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 401 | User not authenticated |
| 403 | User not authorized for specific project |
| 422 | Validation Error |

### /project/{project_id}/model

#### GET
##### Summary

Download Model

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| project_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 400 | Model not found on server |
| 401 | User not authenticated |
| 403 | User not authorized for specific project |
| 422 | Validation Error |

### /project/{project_id}/file

#### GET
##### Summary

Get Files

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| project_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 401 | User not authenticated |
| 403 | User not authorized for specific project |
| 422 | Validation Error |

#### POST
##### Summary

Upload File

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| project_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 401 | User not authenticated |
| 403 | User not authorized for specific project |
| 422 | Validation Error |

#### DELETE
##### Summary

Delete File

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| project_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 400 | File not found |
| 401 | User not authenticated |
| 403 | User not authorized for specific project |
| 422 | Validation Error |

### /tag/{invite_url}

#### GET
##### Summary

Get Project Info

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| invite_url | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 403 | Invite link not valid |
| 422 | Validation Error |

### /tag/{invite_url}/text

#### GET
##### Summary

Get Random Text

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| invite_url | path |  | Yes | string |
| predict | query |  | No | boolean |
| tagging_id | cookie |  | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 400 | MLService is offline or not responding |
| 403 | Invite link not valid |
| 406 | All texts in project are tagged |
| 422 | Validation Error |

### /tag/{invite_url}/tag

#### POST
##### Summary

Tag Text

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| invite_url | path |  | Yes | string |
| tagging_id | cookie |  | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 400 | Tag array cannot be empty or multiple tags in single-label project or text not found |
| 401 | Invite link not matching document |
| 403 | Invite link not valid |
| 406 | Tag doesn't exist in project |
| 409 | Text already tagged |
| 422 | Validation Error |

### /data/{project_id}/tags

#### GET
##### Summary

Get Tags

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| project_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 400 | Project not found |
| 422 | Validation Error |

### /data/{project_id}/dataset

#### GET
##### Summary

Get Dataset

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| project_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 400 | Project not found |
| 422 | Validation Error |

### /data/{project_id}/modelState

#### POST
##### Summary

Set Model State

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| project_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 422 | Validation Error |

### Models

#### AccessToken

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| access_token | string |  | Yes |
| token_type | string |  | Yes |

#### Body_login_user_login_post

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| username | string |  | Yes |
| password | string |  | Yes |

#### Body_register_user_register_post

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| username | string |  | Yes |
| password | string |  | Yes |

#### Body_upload_file_project__project_id__file_post

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| files | [ binary ] |  | Yes |

#### DatasetResponse

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| labels | [ [ integer ] ] |  | Yes |
| texts | [ string ] |  | Yes |

#### FileDeleteRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| file_id | string |  | Yes |

#### HTTPValidationError

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| detail | [ object ] |  | No |

#### ModelStateRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| state | string |  | Yes |

#### Project

Document Mapping class.

Fields:

- `id` - MongoDB document ObjectID "_id" field.
Mapped to the PydanticObjectId class

Inherited from:

- Pydantic BaseModel
- [UpdateMethods](https://roman-right.github.io/beanie/api/interfaces/#aggregatemethods)

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string |  | Yes |
| texts | [ object ] |  | No |
| data | object |  | No |
| is_multi_label | boolean |  | No |
| _id | string |  | No |
| owner | string |  | Yes |
| model_state | string |  | No |

#### ProjectCreationData

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string |  | Yes |
| tags | [ string ] |  | No |
| is_multi_label | boolean |  | No |

#### ProjectData

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| tags | [ string ] |  | No |
| invite_url_postfix | string |  | No |

#### TagRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| text_id | string |  | Yes |
| tags | [ string ] |  | Yes |

#### TextDocument

Document Mapping class.

Fields:

- `id` - MongoDB document ObjectID "_id" field.
Mapped to the PydanticObjectId class

Inherited from:

- Pydantic BaseModel
- [UpdateMethods](https://roman-right.github.io/beanie/api/interfaces/#aggregatemethods)

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | string |  | No |
| name | string |  | Yes |
| value | string |  | Yes |
| tags | [ string ] |  | No |

#### TextOut

Document Mapping class.

Fields:

- `id` - MongoDB document ObjectID "_id" field.
Mapped to the PydanticObjectId class

Inherited from:

- Pydantic BaseModel
- [UpdateMethods](https://roman-right.github.io/beanie/api/interfaces/#aggregatemethods)

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | string |  | No |
| name | string |  | Yes |
| value | string |  | Yes |
| tags | [ string ] |  | No |
| possible_tags | [ string ] |  | Yes |
| preferredTag | object |  | No |

#### TokensSet

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| access_token | string |  | Yes |
| refresh_token | string |  | Yes |
| token_type | string |  | Yes |

#### UserOut

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| username | string |  | Yes |
| email | string (email) |  | No |
| full_name | string |  | No |

#### ValidationError

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| loc | [  ] |  | Yes |
| msg | string |  | Yes |
| type | string |  | Yes |
