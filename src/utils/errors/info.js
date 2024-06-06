export const generateUserErrorInfo = user => {
	return `One o more properties where incomplete or not valid.
    list of required properties:
    * email         : needs to be a String, received  ${user.email}
    * password      : needs to be a String, received  ${user.password}`;
};
