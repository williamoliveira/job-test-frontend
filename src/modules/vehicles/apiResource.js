
import { createApiResource } from '../../utils/apiResource'

const { fetchMany, fetchOne } = createApiResource('/vehicle')

export default { fetchMany, fetchOne }
