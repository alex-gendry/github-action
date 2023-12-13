This action creates an ApplicationVersion in Fortify Software Security Center.

### Action environment variable inputs

{{include:env-ssc-create-appversion.md}}

### Sample usage

The sample workflow below demonstrates how to configure the action for running a SAST scan on ScanCentral SAST.

```yaml
    steps:    
      - name: Check out source code
        uses: actions/checkout@v4  
      - name: Create Application Version in SSC
        uses: fortify/github-action/ssc-create-appversion@{{var:action-major-version}}
        env:
{{include:nocomments.env-ssc-create-appversion-sample.md}}
```