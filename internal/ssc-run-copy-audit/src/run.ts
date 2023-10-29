import * as core from '@actions/core';
import * as utils from './utils'
import * as vuln from './vuln'
import * as appversion from './appversion'

function resolveVariables(s: string): string {
	return s.replace(/\$\{(.*?)\}/g, (...match) => {
        return resolveVariables(process.env[match[1]] || '');
	});
}

async function main(): Promise<void> {
	var jp = require('jsonpath')
	const ssc_target_appversion_id : number | string = core.getInput('ssc_target_appversion_id')
	const ssc_copy_appversion_id : number | string = core.getInput('ssc_copy_appversion_id')
	utils.debugObject(`Copying AppVersion Audit values ${ssc_copy_appversion_id} -> ${ssc_target_appversion_id}`)
	utils.debugObject(`Get CustomTag list from AppVersion ${ssc_copy_appversion_id}`)
	const customTags = await appversion.getAppVersionCustomTags(
		ssc_copy_appversion_id,
		'id,guid,name,valueType,valueList'
	)
	utils.debugObject(`CustomTags Qty: ${customTags?.length}`)
	utils.debugObject(`Get vulns list from Source AppVersion ${ssc_copy_appversion_id}`)
	const vulns = await appversion.getAppVersionVulns(
		ssc_copy_appversion_id,
		'',
		'',
		'id,issueInstanceId,revision',
		'auditValues'
	)
	utils.debugObject(`Vulns Qty: ${vulns?.length}`)
	utils.debugObject(`transpose to appversion ${ssc_target_appversion_id}`)
	await vuln.transposeToAppVersion(vulns, ssc_target_appversion_id)

	let requests: any[] = []
	await Promise.all(
		vulns.map(async function (vulnTmp: any) {
			// const customTagUniqueValues: string[] = Array.from(new Set(jp.query(vulns, `$..[?(@.customTagGuid=="${customTag.guid}")].textValue`)))
			if (vulnTmp._embed.auditValues.length) {
				requests.push(
					vuln.getAuditVulnsRequest(
						ssc_target_appversion_id,
						[
							{
								id: vulnTmp.id,
								revision: vulnTmp.revision
							}
						],
						vulnTmp._embed.auditValues
					)
				)
			}
		})
	)

	await utils.fcliRest(
		'/api/v1/bulk',
		'POST',
		JSON.stringify({ requests: requests })
	)
}

main();
