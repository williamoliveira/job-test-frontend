
import { createApiResource, axios, extractData } from '../../utils/apiResource'

const endpoint = '/date'

const { fetchMany, fetchOne, save } = createApiResource(endpoint)

const bulkSave = (data) => axios.post(`${endpoint}/bulk`, data).then(extractData)

export default { fetchMany, fetchOne, save, bulkSave }
