import Joi from "joi";
import {accountRoles} from "application-common-components";

export const accountRoleValidation = Joi.string().valid(accountRoles.admin, accountRoles.user);
