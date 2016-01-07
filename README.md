# Subscribe2 
A jQuery based email subscription widget with Google forms as backend.

## Usage
* Downlaod code from `./dist`
* Include the following lines of code in the `<head>` section of your HTML.

`<link href="path-to-css/jquery.subscribe2.min.css" rel="stylesheet" />`

`<script src="path-to-js/jquery.subscribe2.min.js"></script>`

* Initialize `Subscribe2` by passing your Google forms metadata (See [Arguments](#arguments)) on any container element like `<div>` that you want to make awesome.

```
<script type="text/javascript">
  $('#elem').subscribe2({
	        options: {
	                method: "google",
	                formkey: "<your-form's-key>(See below)",
	                datakey: "entry.57553044"
	            },
	        });
</script>
<div id="elem"></div>
```

Check out the demo to see `Subscribe2` in action.

## Arguments
* `options` [Required] | Object
	*  	`method` [Required] | `String` | Currently only supported value is `google` for google forms.
	*  	`formkey` [Required] | `String` | Key for Google form. For `https://docs.google.com/forms/d/XXXXXXX/`,  `XXXXXXX` is your form key.
	*  	`datakey` [Required] | `String` | `name` attribute of input element in your form.
* `buttonText` (Optional) | `String` | Text for widget button | Default: "Request Invite"
* `btnClass`: (Optional) | `String` | Additional class/classes for widget button | Default: ""
* `inputClass`: (Optional) | `String` | Additional class/classes for widget input control | Default: ""
* `errorMessages` (Optional) | `Object` | Default: `{ client: "Please enter a valid email address.", server: "Error contacting server" }`
* `successMessage` (Optional) | `String` | Default: `"Thanks. We have added you to our list and you will be notified soon."`

## Features
* Minimal responsive css.
* Configurable content.
* 100% Client side code.

## Build
`grunt build`

## License

[MIT License](http://zenorocha.mit-license.org/) Abhas Tandon
