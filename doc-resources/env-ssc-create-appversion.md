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





