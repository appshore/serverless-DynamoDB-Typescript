import 'source-map-support/register';

import { crudReturnInter } from '../types/crudInterface';

/**
 * check health
 */
export const check = (): crudReturnInter => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      message: 'Function Health executed successfully!',
    },
    null,
    2
  ),
});
