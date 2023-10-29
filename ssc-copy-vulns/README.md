# Copy Application Version Vulnerabilities in Fortify Software Security Center

Build secure software fast with [Fortify](https://www.microfocus.com/en-us/solutions/application-security). Fortify offers end-to-end application security solutions with the flexibility of testing on-premises and on-demand to scale and cover the entire software development lifecycle.  With Fortify, find security issues early and fix at the speed of DevOps.

This GitHub Action utilizes [fcli](https://github.com/fortify/fcli) to copy Vulnerabilities from one application version to another.

## Table of Contents

* [Usage](#usage)
    * [Copy Application Version Vulnerabilities](#copy-application-version-vulnerabilities)
* [Environment Variables](#environment-variables)

## Usage

This GitHub Action achieves the following :

- Setup fcli
- Login to Software Security Center
- Copy Vulnerabilities from one application version to another

### Copy Application Version Vulnerabilities

This example workflow demonstrates how to copy one application version to another

```yaml
name: (FTFY) Copy Application Version Vulnerabilities
on: [workflow dispatch]
      
jobs:                                                  
  CopyVulns:
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

      - name: copy-vulns
        uses: fortify-ps/github-action/ssc-copy-vulns@v1
```

#### SSC Considerations

* FCLI supports Fortify Token in Decoded and Encoded format

## Environment Variables

The Environment Variable for the following actions apply:
- fortify-ps/github-action/setup
- fortify-ps/github-action/internal/ssc-login

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
