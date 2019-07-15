class Security{

    hasCapability(user, targetObject){
        
        //user, rules, roles, capabilities
        
        //erro de programação deve esconder os itens... melhor esconder do que mostrar o que não deve
        if(!targetObject)
            return false;

        if(targetObject.hasOwnProperty("unimplemented") && targetObject.unimplemented){
            return false;
        }

        //se não existe restrição permite-se o acesso
        if(!Object.keys(targetObject).includes("restrictions") || targetObject.restrictions===null || targetObject.restrictions.length===0)
            return true;

        //Hierarquia de tipos de checagem de acessos
        //Rules > Roles > Capabilities

        //rules só vão permitir o acesso dos administradores quando isso for indicado na rule
        if(targetObject.restrictions.rules!=null)
            return this.checkRules(user, targetObject);
        
        //administradores tem acesso a todas as funcionalidades por Role e Capability
        if(this.isAdmin(user))
            return true;

        if(targetObject.restrictions.roles!=null)
            return this.checkRoles(user, targetObject.restrictions.roles);

        return this.checkCapabilities(user, targetObject.restrictions.capabilities);
        
    }

    isAdmin(user){
        return user.roles!=null && (user.roles.includes('admin') || user.roles.includes('manager'));
    }


    // Área de Critérios ----------------------------------

    checkRules(user, targetObject){
        //checar cada regra - todas devem ser verdadeiras
        let allRuleChecks = [...new Set(targetObject.restrictions.rules.map(rule=>(this.checkRule(user, rule, targetObject))))].filter(e=>(e));
        return allRuleChecks.length===1;
    }

    checkRoles(user, roles){
        let allChecks = [...new Set(user.roles.map(role=>(this.checkRole(role, roles))))].filter(e=>(e));
        return allChecks.length===1;
    }

    checkCapabilities(user, capabilities){
        if(capabilities.length===0)
            return true;

        if(user.capabilities.length===0)
            return false;

        let allChecks = [...new Set(user.capabilities.map(capability=>(this.checkCapability(capability, capabilities))))].filter(e=>(e));
        return allChecks.length===1;
    }

    // Área de Processamento ----------------------------------
    checkRole(role, roles){
        return roles.includes(role);
    }

    checkCapability(capability, capabilities){
        return capabilities.includes(capability);
    }

    // Área de Descrição das regras ----------------------------------
    checkRule(user, rule, targetObject){
        switch (rule) {
            case 'exceptTypesEnlisteds'           : return this.checkRuleExceptTypesEnlisteds(targetObject);
            case 'onlyTypesEnlisteds'             : return this.checkRuleOnlyTypesEnlisteds(targetObject);

            case 'student_only'                   : return this.checkRuleStudentOnly(user);
            case 'enrolment_active'               : return this.checkRuleEnrolmentActive(user);
            case 'manage_activity'                : return this.checkRuleManageActivity(user, targetObject);
            case 'manage_activity_with_completion': return this.checkRuleManageActivityWithCompletion(user, targetObject);
            default: return false;
        }
    }

    checkRuleEnrolmentActive(user){
        if(this.isAdmin(user))
            return true;
        return user.userEnrolment!=null;
    }

    /**
     * Professor em uma atividade completion
     * @param {*} user 
     * @param {*} targetObject 
     */
    checkRuleManageActivityWithCompletion(user, targetObject){
        if(!targetObject.hasOwnProperty('activity') || !targetObject.activity.completion)
            return false;

        if(this.isAdmin(user))
            return true;
        return (user.roles.includes('teacher') || user.roles.includes('editingteacher'));
        
    }

    /**
     * Professor em uma atividade
     * @param {*} user 
     * @param {*} targetObject 
     */
    checkRuleManageActivity(user, targetObject){
        if(this.isAdmin(user))
            return true;
        return (user.roles.includes('teacher') || user.roles.includes('editingteacher'));
    }

    /**
     * Somente aluno em uma atividade
     * @param {*} user 
     * @param {*} targetObject 
     */
    checkRuleStudentOnly(user, targetObject){
        return (user.roles.includes('student'));
    }

    checkRuleExceptTypesEnlisteds(targetObject){
        const { restrictions, activity } = targetObject;
        if(!restrictions.hasOwnProperty('items')
        || !activity
        || !activity.hasOwnProperty('type'))
            false;
        
        return !restrictions.items.includes(activity.type);
    }

    checkRuleOnlyTypesEnlisteds(targetObject){
        const { restrictions, activity } = targetObject;
        if(!restrictions.hasOwnProperty('items')
        || !activity
        || !activity.hasOwnProperty('type'))
            false;

        return restrictions.items.includes(activity.type);
    }

}


export default new Security();