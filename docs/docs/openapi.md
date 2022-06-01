# HilBERT Trainer API
API for HilBERT application. Project description and source code is avalible at [GitHub](https://github.com/Majkel1999/Hilbert/)

## Version: 0.0.1
---
## User 
---
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
---
## Project
---
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
---
## Project Data
---
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
---
## Tagging
---
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
---
## Model and text data
---
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