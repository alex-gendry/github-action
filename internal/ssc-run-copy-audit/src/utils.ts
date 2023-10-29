import * as core from '@actions/core'
import * as exec from '@actions/exec'
// @ts-ignore
import styles from 'ansi-styles'
import process from "process";

/**
 * Generate the full path to the fcli executable, depending on the env variables :
 *  FCLI_EXECUTABLE_PATH
 *  FCLI_EXECUTABLE_LOCATION
 * @returns {any} returns the full path to fcli
 */
export function getFcliPath(): string {
    if (process.env.FCLI_CMD) {
        return process.env.FCLI_CMD
    } else if (process.env.FCLI_EXECUTABLE_PATH) {
        return `${process.env.FCLI_EXECUTABLE_PATH.replace(/\/+$/, '')}`
    } else if (process.env.FCLI_EXECUTABLE_LOCATION) {
        return `${process.env.FCLI_EXECUTABLE_LOCATION.replace(/\/+$/, '')}/fcli`
    } else {
        return 'fcli'
    }
}

export function getEnvOrValue(
    env_name: string,
    value: any
): string | undefined {
    return process.env[env_name] ? process.env[env_name] : value
}


export async function fcli(
    args: string[],
    returnStatus: boolean = false,
    silent = true
): Promise<any> {
    let responseData = ''
    let errorData = ''
    try {
        const options = {
            listeners: {
                stdout: (data: Buffer) => {
                    responseData += data.toString()
                },
                stderr: (data: Buffer) => {
                    errorData += data.toString()
                }
            },
            silent: silent
        }
        if (core.isDebug()) {
            return await core.group(`fcli ${args.join(' ')}`, async () => {
                const response = await exec.exec(getFcliPath(), args, options)
                debugObject(response, 'status')
                debugObject(responseData, 'responseData')
                debugObject(errorData, 'errorData')

                return returnStatus ? response : JSON.parse(responseData)
            })
        } else {
            const response = await exec.exec(getFcliPath(), args, options)

            return returnStatus ? response : JSON.parse(responseData)
        }
    } catch (err: any) {
        core.error('fcli execution failed: ')
        core.error(`fcli ${args.join(' ')}`)
        core.error(`${errorData}`)
        throw err
    }
}

export async function fcliRest(
    url: string,
    method: string = 'GET',
    body?: string,
    query?: string
) {
    let args: string[] = [
        'ssc',
        'rest',
        'call',
        url,
        `--request=${method}`,
        '--output=json'
    ]
    body ? args.push(`--data=${body}`) : null
    query ? args.concat([`-q`, `${query}`]) : null

    return await fcli(args)
}

export function stringToArgsArray(text: string): string[] {
    const re = /^"[^"]*"$/
    const re2 = /^([^"]|[^"].*?[^"])$/

    let arr: string[] = []
    let argPart: any = null

    text &&
    text.split(' ').forEach(function (arg) {
        if ((re.test(arg) || re2.test(arg)) && !argPart) {
            arr.push(arg)
        } else {
            argPart = argPart ? argPart + ' ' + arg : arg
            if (/"$/.test(argPart)) {
                arr.push(argPart)
                argPart = null
            }
        }
    })

    return arr
}

function toTitleCase(str: string): string {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1)
        })
        .join(' ')
}


export function shortSha(sha: string): string {
    return sha.slice(0, 7)
}

export function debugGroup(title: string, obj: any) {
    core.startGroup(title)
    core.debug(obj)
    core.endGroup()
}

export function errorGroup(title: string, obj: any) {
    core.startGroup(title)
    core.error(obj)
    core.endGroup()
}

export function debugObject(object: any, title?: string) {
    if (title) {
        core.debug(`${title}:`)
    }
    core.debug(object)
}

export function bgGreen(str: string): string {
    return styles.bgGreen.open + str + styles.bgGreen.close
}

export function bgRed(str: string): string {
    return styles.bgRed.open + str + styles.bgRed.close
}

export function bgGray(str: string): string {
    return styles.bgGray.open + str + styles.bgRed.close
}

export function bgYellow(str: string): string {
    return styles.bgYellow.open + str + styles.bgYellow.close
}

export function bgBlue(str: string): string {
    return styles.bgBlue.open + str + styles.bgBlue.close
}

export function success(str: string): string {
    return `${str} ..... ${bgGreen(' Success ')}`
}

export function exists(str: string): string {
    return `${str} ..... ${bgBlue(' Exists ')}`
}

export function failure(str: string): string {
    return `${str} ..... ${bgRed(' Failure ')}`
}

export function skipped(str: string): string {
    return `${str} ..... ${bgGray(' Skipped ')}`
}

export function notFound(str: string): string {
    return `${str} ..... ${bgGray(' Not Found ')}`
}
