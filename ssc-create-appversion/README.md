# fortify/github-action/ssc-create-appversion@v1



<!-- START-INCLUDE:p.marketing-intro.md -->

[Fortify Application Security](https://www.microfocus.com/en-us/solutions/application-security) provides your team with solutions to empower [DevSecOps](https://www.microfocus.com/en-us/cyberres/use-cases/devsecops) practices, enable [cloud transformation](https://www.microfocus.com/en-us/cyberres/use-cases/cloud-transformation), and secure your [software supply chain](https://www.microfocus.com/en-us/cyberres/use-cases/securing-the-software-supply-chain). As the sole Code Security solution with over two decades of expertise and acknowledged as a market leader by all major analysts, Fortify delivers the most adaptable, precise, and scalable AppSec platform available, supporting the breadth of tech you use and integrated into your preferred toolchain. We firmly believe that your great code [demands great security](https://www.microfocus.com/cyberres/application-security/developer-security), and with Fortify, go beyond 'check the box' security to achieve that.

<!-- END-INCLUDE:p.marketing-intro.md -->



<!-- START-INCLUDE:action-ssc-create-appversion.md -->

This action creates an ApplicationVersion in Fortify Software Security Center.

### Action environment variable inputs


<!-- START-INCLUDE:env-ssc-create-appversion.md -->

**`SSC_APPVERSION`** - OPTIONAL   
Application and version name. 
If not provided, <repository>:<branch> will be used

**`SSC_APPVERSION_ACTIVE`** - OPTIONAL   
Specify whether application version should be activated (true, default) or not (false).

**`SSC_ADD_USERS`** - OPTIONAL   
Assign one or more (comma-separated) users or LDAP groups to the application version; accepts user id, entity name or email address. Option is repeatable.

**`SSC_ATTRIBUTES`** - OPTIONAL   
Set values for one or more attributes. This option accepts a semicolon-separated list of comma-separated list of attribute value assignments.
*Example*: `SSC_ATTRIBUTES: "Interfaces=Batch Processing Console,GUI;Development Phase=Active Development"`

**`SSC_AUTO_ATTRIBUTES`** - OPTIONAL   
Automatically set a default value for required application version attributes.

**`SSC_COPY_OPTIONS`** - OPTIONAL   
Comma separated list of elements to copy (Requires SSC_APPVERSION_FROM). By default, all are copied.
Allowed values:  AnalysisProcessingRules, VersionAttributes, BugTrackerConfiguration, CustomTags, IssueTemplate, State, UserAccess.

**`SSC_APPVERSION_DELIMITER`** - OPTIONAL   
Change the default delimiter character when using options that accept "application:version" as an argument or parameter.

**`SSC_APPVERSION_DESCRIPTION`** - OPTIONAL   
Application version description.

**`SSC_APPVERSION_FROM`** - OPTIONAL   
Copy FROM application version: id or <application>:<version> name.
If not provided, <repository>:<base_branch or default_branch> will be used

**`SSC_ISSUE_TEMPLATE`** - OPTIONAL   
Issue template name or id.

**`SSC_REFRESH`** - OPTIONAL   
By default, this action will refresh the source application version's metrics when copying from it. Note that for large applications this can lead to an error if the timeout expires.

**`SSC_APPVERSION_SKIP`** - OPTIONAL   
Skip application version creation if an application version with the specified name already exists.






<!-- END-INCLUDE:env-ssc-create-appversion.md -->


### Sample usage

The sample workflow below demonstrates how to configure the action for running a SAST scan on ScanCentral SAST.

```yaml
    steps:    
      - name: Check out source code
        uses: actions/checkout@v4  
      - name: Create Application Version in SSC
        uses: fortify/github-action/ssc-create-appversion@v1

        env:
          # SSC_APPVERSION: MyApp:MyVersion
          # SSC_APPVERSION_ACTIVE: false
          # SSC_ADD_USERS: user1,user2@email.com,3
          SSC_ATTRIBUTES: "Development Phase=Active Development;Development Strategy=Internally Developed;Accessibility=Internal Network Access Required"
          # SSC_AUTO_ATTRIBUTES: true
          # SSC_COPY_OPTIONS: AnalysisProcessingRules,VersionAttributes,BugTrackerConfiguration,CustomTags,IssueTemplate,State,UserAccess
          # SSC_APPVERSION_DELIMITER: ":"
          # SSC_APPVERSION_DESCRIPTION: Created from Github Worflow
          # SSC_APPVERSION_FROM: MyApp:master
          SSC_ISSUE_TEMPLATE: Prioritized High Risk Issue Template
          # SSC_REFRESH: false
          SSC_APPVERSION_SKIP: true
```

<!-- END-INCLUDE:action-ssc-create-appversion.md -->



<!-- START-INCLUDE:h2.support.md -->

## Support

The only warranties for products and services of Open Text and its affiliates and licensors (“Open Text”) are as may be set forth in the express warranty statements accompanying such products and services. Nothing herein should be construed as constituting an additional warranty. Open Text shall not be liable for technical or editorial errors or omissions contained herein. The information contained herein is subject to change without notice.

The software is provided "as is" and is not supported through the regular OpenText Support channels. Support requests may be submitted through the [GitHub Issues](https://github.com/fortify/github-action
/issues) page for this repository. A (free) GitHub account is required to submit new issues or to comment on existing issues. 

Support requests created through the GitHub Issues page may include bug reports, enhancement requests and general usage questions. Please avoid creating duplicate issues by checking whether there is any existing issue, either open or closed, that already addresses your question, bug or enhancement request. If an issue already exists, please add a comment to provide additional details if applicable.

Support requests on the GitHub Issues page are handled on a best-effort basis; there is no guaranteed response time, no guarantee that reported bugs will be fixed, and no guarantee that enhancement requests will be implemented. If you require dedicated support for this and other Fortify software, please consider purchasing OpenText Fortify Professional Services. OpenText Fortify Professional Services can assist with general usage questions, integration of the software into your processes, and implementing customizations, bug fixes, and feature requests (subject to feasibility analysis). Please contact your OpenText Sales representative or fill in the [Professional Services Contact Form](https://www.microfocus.com/en-us/cyberres/contact/professional-services) to obtain more information on pricing and the services that OpenText Fortify Professional Services can provide.

<!-- END-INCLUDE:h2.support.md -->


---

*[This document was auto-generated; do not edit by hand](https://github.com/fortify/shared-doc-resources/blob/main/USAGE.md)*
