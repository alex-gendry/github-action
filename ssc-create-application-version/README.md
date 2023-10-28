# Create Application Version in Fortify Software Security Center

Build secure software fast with [Fortify](https://www.microfocus.com/en-us/solutions/application-security). Fortify offers end-to-end application security solutions with the flexibility of testing on-premises and on-demand to scale and cover the entire software development lifecycle.  With Fortify, find security issues early and fix at the speed of DevOps.

This GitHub Action utilizes [fcli](https://github.com/fortify/fcli) to create an Application Version in Fortify Software Security Center.
The Action can copy the Application State and the Values from another Application version

## Table of Contents

* [Requirements](#requirements)
    * [SSC instance](#ssc-instance)
    * [Network connectivity](#network-connectivity)
    * [fcli](#fcli)
* [Usage](#usage)
    * [Create Application Version](#create-application-version)
        * [Create Application Version with Copy State and Vulns](#create-application-version-with-copy-state-and-vulns)
        * [SSC Inputs](#ssc-inputs)
* [Environment Variables](#environment-variables)
* [Information for Developers](#information-for-developers)

## Requirements

### SSC instance
Obviously you will need to have an SSC instance from which you can retrieve Fortify scan results. If you are not already a Fortify customer, check out our [Free Trial](https://www.microfocus.com/en-us/products/application-security-testing/free-trial).

### Network connectivity
The SSC instance in which you want to create an Application Version needs to be accessible from the GitHub Runner where this action is being executed. Following table lists some considerations:

| Source | Runner        | Considerations |
| ------ | ------------- | -------------- |
| SSC    | GitHub-hosted | GitHub lists [IP addresses for GitHub-hosted runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#ip-addresses) that need to be allowed network access to SSC. Exposing an SSC instance to the internet, even if limited to only GitHub IP addresses, could pose a security risk. |
| SSC    | Self-hosted   | May need to allow network access from the self-hosted runner to SSC if in different network segments |

### fcli

This action uses [fcli](https://github.com/fortify/fcli) for most of its call to Software Security Center. Either use the [OpenText Official Docker Image](https://hub.docker.com/r/fortifydocker/fortify-ci-tools): `
fortifydocker/fortify-ci-tools`. Or download the cli in you jobs:

```bash
  - name: Download fcli
    run: |
      wget -qO- https://github.com/fortify/fcli/releases/download/v2.0.0/fcli-linux.tgz | tar zxf -  
```

## Usage

This GitHub Action achieves the following :

Login to Software Security Center
Create the Application Version in Fortify Software Security Center. Option to copy the status (Attributes) from another Application Version

### Create Application Version

This example workflow demonstrates how to create an application version in SSC, using the repo and branch names as app:version \
The required ApplicationVersion's Attributes can be specified using `SSC_APPVERSION_ATTRIBUTES`

```yaml
name: (FTFY) Create Application Version
on: [workflow dispatch]
      
jobs:                                                  
  CreateAppVersion:
    runs-on: ubuntu-latest
    
    container:
      image: fortifydocker/fortify-ci-tools
    
    env:
      SSC_URL: ${{ vars.FTFY_SSC_BASE_URL }}
      SSC_TOKEN: ${{ secrets.FTFY_CI_TOKEN_ENC }}

    steps:
      - name: create-appversion
        uses: fortify/github-action/ssc-create-application-version@v1
```

#### SSC Considerations

* FCLI supports Fortify Token in Decoded and Encoded format
* Username and Password are required to copy the application version state from another one. The CI Token does not have the required permissions. Unified Login Token is the only type of token, but has a maximum expiration of 1 day

#### Create Application Version with Copy State and Vulns

This example workflow demonstrates how to create an application version in SSC, and copying the Rule, Access and Attributes from a source application version

```yaml
name: (FTFY) Create Application Version
on: [workflow dispatch]

jobs:
  CreateAppVersion:
    runs-on: ubuntu-latest

    container:
      image: fortifydocker/fortify-ci-tools

    env:
      SSC_APP: ${{ github.event.repository.name }}
      SSC_VERSION: ${{ github.ref_name }}
      SSC_SOURCE_VERSION: master
      SSC_APPVERSION_ATTRIBUTES: |
        Accessibility=Internal Network Access Required
        DevStrategy=Internally Developed
        DevPhase=New
        Interfaces=Programmatic API
      SSC_APPVERSION_ISSUE_TEMPLATES: Prioritized High Risk Issue Template
      SSC_URL: ${{ vars.FTFY_SSC_BASE_URL }}
      SSC_USER: ${{ secrets.FTFY_CI_USERNAME }}
      SSC_PASSWORD: ${{ secrets.FTFY_CI_PASSWORD }}

    steps:
      - name: create-appversion
        uses: fortify/github-action/ssc-create-application-version@v1
          
```
#### SSC Inputs



## Environment Variables

The Environment Variable for the following actions apply:
- fortify-ps/github-action/setup
- fortify-ps/github-action/internal/ssc-login

**`SSC_APP`**  *Optional*\
The target SSC application name to create
Default: Repository name

**`SSC_VERSION`**  *Optional*\
The target SSC application version name to create
Default: Branch name

**`SSC_APPVERSION_ATTRIBUTES`**   *Optional*\
The target SSC application version attributes to be assigned. \
This is a multiline input using the fcli syntax for appversion-attributes updates : `fcli ssc appversion-attribute set -h`\
List of available attributes: `fcli ssc attribute-definition list` (add `-o json`to get list of available values)
```yaml
ssc_version_attributes: |
    Accessibility=Internal Network Access Required
    DevStrategy=Internally Developed
    DevPhase=New
```
**Notes**:
* Attributes assignment will happen after source application Copy State
* By default, the above attributes are required when creating an application. This can be disable in SSC > Administration > Templates > Attributes

**`SSC_APPVERSION_ISSUE_TEMPLATES`**  *Optional*\
The target SSC application version issue template to be assigned.\
```yaml
ssc_version_issue_template: PCI v4.0 Basic Issue Template
```
**Notes**:
* Issue template assignment will happen after source application Copy State
* By default, an issue template is required when creating an application. However, you can define a default template in SSC > Administration > Templates > Issue Templates

**`SSC_SOURCE_APP`**   *Optional*\
The source SSC application name to copy from
**Notes**:
* If SSC_SOURCE_VERSION is provided: SSC_SOURCE_APP can be left blank to point to SSC_APP

**`SSC_SOURCE_VERSION`**   *Optional*\
The source SSC application version name to copy from