// user.ts
import { post, get } from '../config/request'

export function workbench(data) {
	return post('/project-front-end/v2/workflow/workbench', data)
}

export function workbench2(data) {
	return post('/project-front-end/v2/workflow/workbench', data)
}
