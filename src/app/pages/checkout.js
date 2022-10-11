module.exports = {
	elements: {
		firstNameInput: "#firstNameInput",
		lastNameInput: "#lastNameInput",
		addressInput: "#addressLine1Input",
		provinceInput: "#provinceInput",
		zipcodeInput: "#postCodeInput",
	},
	commands: [
		{
			enterDetailAndSubmit: function (
				firstName,
				lastName,
				address,
				province,
				zipcode
			) {
				return this.clearValue("@firstNameInput")
					.setValue("@firstNameInput", firstName)
					.clearValue("@lastNameInput")
					.setValue("@lastNameInput", lastName)
					.clearValue("@addressInput")
					.setValue("@addressInput", address)
					.clearValue("@provinceInput")
					.setValue("@provinceInput", province)
					.clearValue("@zipcodeInput")
					.setValue("@zipcodeInput", zipcode)
			},
		},
	],
};