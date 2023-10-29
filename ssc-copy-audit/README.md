# Copy Application Version Audit in Fortify Software Security Center

Build secure software fast with [Fortify](https://www.microfocus.com/en-us/solutions/application-security). Fortify offers end-to-end application security solutions with the flexibility of testing on-premises and on-demand to scale and cover the entire software development lifecycle.  With Fortify, find security issues early and fix at the speed of DevOps.

This GitHub Action utilizes [fcli](https://github.com/fortify/fcli) to copy Audit information from one application version to another.

## Table of Contents

* [Requirements](#requirements)
    * [SSC instance](#ssc-instance)
    * [Network connectivity](#network-connectivity)
    * [fcli](#fcli)
* [Usage](#usage)
    * [Copy Application Version Audit information](#copy-application-version-audit-information)
* [Environment Variables](#environment-variables)

## Requirements

### SSC instance
Obviously you will need to have an SSC instance from which you can retrieve Fortify scan results. If you are not already a Fortify customer, check out our [Free Trial](https://www.microfocus.com/en-us/products/application-security-testing/free-trial).

### Network connectivity
The SSC instance you wish to reach needs to be accessible from the GitHub Runner where this action is being executed. Following table lists some considerations:

| Source | Runner        | Considerations |
| ------ | ------------- | -------------- |
| SSC    | GitHub-hosted | GitHub lists [IP addresses for GitHub-hosted runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#ip-addresses) that need to be allowed network access to SSC. Exposing an SSC instance to the internet, even if limited to only GitHub IP addresses, could pose a security risk. |
| SSC    | Self-hosted   | May need to allow network access from the self-hosted runner to SSC if in different network segments |

### fcli

This action uses [fcli](https://github.com/fortify/fcli) for most of its call to Software Security Center.

## Usage

This GitHub Action achieves the following :

- Setup fcli
- Login to Software Security Center
- Copy Audit information from one application version to another

### Copy Application Version Audit information

This example workflow demonstrates how to copy one application version to another

```yaml
name: (FTFY) Copy Audit
on: [workflow dispatch]
      
jobs:                                                  
  CopyAudit:
    runs-on: ubuntu-latest
    
    container:
      image: fortifydocker/fortify-ci-tools
    
    env:
      SSC_SOURCE_APP: "source_app_name"
      SSC_SOURCE_VERSION: "source_version_name"
      SSC_APP: "target_app_name"
      SSC_VERSION: "target version_name"
      SSC_URL: ${{ vars.FTFY_SSC_BASE_URL }}
      SSC_TOKEN: ${{ secrets.FTFY_CI_TOKEN_ENC }}

    steps:
      - name: Checkout
        id: checkout
        uses: actions/checkout@v4

      - name: copy-audit
        uses: fortify/github-action/ssc-copy-audit@v1
```

#### SSC Considerations

* FCLI supports Fortify Token in Decoded and Encoded format

## Environment Variables

The Environment Variable for the following actions apply:
- fortify/github-action/setup
- fortify/github-action/internal/ssc-login

**`SSC_SOURCE_VERSION_ID`**   *Optional*\
The source SSC application version id to copy from

**`SSC_SOURCE_VERSION`**   *Optional*\
The source SSC application version name to copy from

**`SSC_SOURCE_APP`**   *Optional*\
The source SSC application name to copy from
**Notes**:
* If SSC_SOURCE_VERSION is provided: SSC_SOURCE_APP can be left blank to point to SSC_APP

**`SSC_APP`**  *Optional*\
The target SSC application id

**`SSC_APP`**  *Optional*\
The target SSC application name
Default: Repository name

**`SSC_VERSION`**  *Optional*\
The target SSC application version name
Default: Branch name
ssue Templates