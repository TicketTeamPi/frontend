import type { LoginData, RegisterData } from "src/types/type";
import { api } from "../utils/API";
import type { create } from "domain";
import { ap } from "node_modules/react-router/dist/development/lib-C1JSsICm.mjs";

const endpoint = '/users/'

export const userService = {
    list: () => api.get(endpoint),
    getById: (id: string) => api.get(endpoint + id),
    create: () => api.post(endpoint),
    remove: (id: string) => api.patch(endpoint + 'change-status/' + id),
    updatePassword: (id: string, data: any) => api.put(endpoint + id + '/status' )
}