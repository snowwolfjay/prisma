import type { Action, Client } from '../../getPrismaClient'
import { aggregate } from './aggregates/aggregate'
import { count } from './aggregates/count'
import { groupBy } from './aggregates/groupBy'
import type { ModelAction } from './applyModel'

/**
 * Dynamically returns the appropriate aggregate action for a given `action`.
 * With this, we are able to provide an aggregate api that has a better DX. In
 * short, we manipulate the user input which is designed to have DX to transform
 * it into something that the engines understand. Similarly, we take the engine
 * output for that input and produce something that is easier to work with.
 * @param client to provide dmmf information
 * @param action that tells which aggregate action to execute
 * @param modelAction a callback action that triggers request execution
 * @returns
 */
export function applyAggregates(client: Client, action: Action, modelAction: ModelAction) {
  // we effectively take over the aggregate api to perform data changes
  if (action === 'aggregate') return (userArgs?: object) => aggregate(client, userArgs, modelAction)
  if (action === 'count') return (userArgs?: object) => count(client, userArgs, modelAction)
  if (action === 'groupBy') return (userArgs?: object) => groupBy(client, userArgs, modelAction)

  return undefined
}
