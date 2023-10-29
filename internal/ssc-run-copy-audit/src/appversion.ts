import * as utils from './utils'

export async function getAppVersionCustomTags(
    appVersionId: string | number,
    fields?: string
): Promise<any> {
  const url = `/api/v1/projectVersions/${appVersionId}/customTags?${
      fields ? `fields=${fields}&` : ''
  }`
  return await utils.fcliRest(url)
}

export async function getAppVersionVulns(
    appId: number | string,
    restQuery?: string,
    fcliQuery?: string,
    fields?: string,
    embed?: string
): Promise<any[]> {
  let vulns: any[] = []

  let url: string = `/api/v1/projectVersions/${appId}/issues?`
  url += restQuery ? `q=${encodeURI(restQuery)}&qm=issues&` : ''
  url += fields ? `fields=${fields}&` : ''
  url += embed ? `embed=${embed}&` : ''

  return await utils.fcliRest(url, 'GET', '', fcliQuery)
}