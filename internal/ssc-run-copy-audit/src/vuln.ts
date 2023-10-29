import * as utils from './utils'
import * as appversion from './appversion'
import * as core from '@actions/core'
import { bgYellow } from './utils'

export async function transposeToAppVersion(
    vulns: any,
    appVersionId: string | number
) {
    utils.debugObject(`Transposing vulns to ${appVersionId}`)
    utils.debugObject(`source vulns qty: ${vulns?.length}`)
    utils.debugObject(`Getting target vulns`)
    const targetVulns = await appversion.getAppVersionVulns(
        appVersionId,
        '',
        '',
        'id,issueInstanceId,revision'
    )
    utils.debugObject(`target vulns qty: ${targetVulns?.length}`)
    var jp = require('jsonpath')

    vulns?.forEach(function (vuln: any, index: number, vulns: any[]) {
        const targetVuln = jp.query(
            targetVulns,
            `$..[?(@.issueInstanceId=="${vuln.issueInstanceId}")]`
        )[0]
        if (targetVuln?.id) {
            utils.debugObject(
                `target vuln found for issueInstanceId ${vuln.issueInstanceId} : ${targetVuln.id} `
            )
            vuln.id = targetVuln.id
            vuln.revision = targetVuln.revision
        } else {
            utils.debugObject(
                `target vuln ${bgYellow('not found')} for issueInstanceId ${
                    vuln.issueInstanceId
                }. Removing it from array `
            )
            vulns.splice(index, 1)
        }
    })
}

export function getAuditVulnsRequest(
    appVersionId: string | number,
    vulns: any[],
    customTagAudits: any[]
) {
    const body: any = {
        issues: vulns,
        customTagAudit: customTagAudits
    }

    const uri = `/api/v1/projectVersions/${appVersionId}/issues/action/audit`

    return {
        httpVerb: 'POST',
        postData: body,
        uri: core.getInput('ssc_base_url') + uri
    }
}