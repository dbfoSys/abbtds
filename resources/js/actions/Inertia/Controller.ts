import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
const Controller980bb49ee7ae63891f1d891d2fbcf1c9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
})

Controller980bb49ee7ae63891f1d891d2fbcf1c9.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
Controller980bb49ee7ae63891f1d891d2fbcf1c9.url = (options?: RouteQueryOptions) => {
    return Controller980bb49ee7ae63891f1d891d2fbcf1c9.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
Controller980bb49ee7ae63891f1d891d2fbcf1c9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
Controller980bb49ee7ae63891f1d891d2fbcf1c9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
    const Controller980bb49ee7ae63891f1d891d2fbcf1c9Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
        Controller980bb49ee7ae63891f1d891d2fbcf1c9Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
        Controller980bb49ee7ae63891f1d891d2fbcf1c9Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller980bb49ee7ae63891f1d891d2fbcf1c9.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller980bb49ee7ae63891f1d891d2fbcf1c9.form = Controller980bb49ee7ae63891f1d891d2fbcf1c9Form
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/home'
 */
const Controller8916cc3023b81e31fc622dbbe33246b8 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller8916cc3023b81e31fc622dbbe33246b8.url(options),
    method: 'get',
})

Controller8916cc3023b81e31fc622dbbe33246b8.definition = {
    methods: ["get","head"],
    url: '/home',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/home'
 */
Controller8916cc3023b81e31fc622dbbe33246b8.url = (options?: RouteQueryOptions) => {
    return Controller8916cc3023b81e31fc622dbbe33246b8.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/home'
 */
Controller8916cc3023b81e31fc622dbbe33246b8.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller8916cc3023b81e31fc622dbbe33246b8.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/home'
 */
Controller8916cc3023b81e31fc622dbbe33246b8.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller8916cc3023b81e31fc622dbbe33246b8.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/home'
 */
    const Controller8916cc3023b81e31fc622dbbe33246b8Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller8916cc3023b81e31fc622dbbe33246b8.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/home'
 */
        Controller8916cc3023b81e31fc622dbbe33246b8Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller8916cc3023b81e31fc622dbbe33246b8.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/home'
 */
        Controller8916cc3023b81e31fc622dbbe33246b8Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller8916cc3023b81e31fc622dbbe33246b8.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller8916cc3023b81e31fc622dbbe33246b8.form = Controller8916cc3023b81e31fc622dbbe33246b8Form
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
const Controller42a740574ecbfbac32f8cc353fc32db9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
})

Controller42a740574ecbfbac32f8cc353fc32db9.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
Controller42a740574ecbfbac32f8cc353fc32db9.url = (options?: RouteQueryOptions) => {
    return Controller42a740574ecbfbac32f8cc353fc32db9.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
Controller42a740574ecbfbac32f8cc353fc32db9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
Controller42a740574ecbfbac32f8cc353fc32db9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
    const Controller42a740574ecbfbac32f8cc353fc32db9Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller42a740574ecbfbac32f8cc353fc32db9.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
        Controller42a740574ecbfbac32f8cc353fc32db9Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller42a740574ecbfbac32f8cc353fc32db9.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
        Controller42a740574ecbfbac32f8cc353fc32db9Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller42a740574ecbfbac32f8cc353fc32db9.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller42a740574ecbfbac32f8cc353fc32db9.form = Controller42a740574ecbfbac32f8cc353fc32db9Form
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/municipal-information'
 */
const Controllere725465242cb0dd0361698ef59e93971 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllere725465242cb0dd0361698ef59e93971.url(options),
    method: 'get',
})

Controllere725465242cb0dd0361698ef59e93971.definition = {
    methods: ["get","head"],
    url: '/municipal-information',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/municipal-information'
 */
Controllere725465242cb0dd0361698ef59e93971.url = (options?: RouteQueryOptions) => {
    return Controllere725465242cb0dd0361698ef59e93971.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/municipal-information'
 */
Controllere725465242cb0dd0361698ef59e93971.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllere725465242cb0dd0361698ef59e93971.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/municipal-information'
 */
Controllere725465242cb0dd0361698ef59e93971.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controllere725465242cb0dd0361698ef59e93971.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/municipal-information'
 */
    const Controllere725465242cb0dd0361698ef59e93971Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controllere725465242cb0dd0361698ef59e93971.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/municipal-information'
 */
        Controllere725465242cb0dd0361698ef59e93971Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controllere725465242cb0dd0361698ef59e93971.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/municipal-information'
 */
        Controllere725465242cb0dd0361698ef59e93971Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controllere725465242cb0dd0361698ef59e93971.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controllere725465242cb0dd0361698ef59e93971.form = Controllere725465242cb0dd0361698ef59e93971Form
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/positions'
 */
const Controllere42a598fe353d6e6b476e0a32bc1cf35 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllere42a598fe353d6e6b476e0a32bc1cf35.url(options),
    method: 'get',
})

Controllere42a598fe353d6e6b476e0a32bc1cf35.definition = {
    methods: ["get","head"],
    url: '/positions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/positions'
 */
Controllere42a598fe353d6e6b476e0a32bc1cf35.url = (options?: RouteQueryOptions) => {
    return Controllere42a598fe353d6e6b476e0a32bc1cf35.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/positions'
 */
Controllere42a598fe353d6e6b476e0a32bc1cf35.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllere42a598fe353d6e6b476e0a32bc1cf35.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/positions'
 */
Controllere42a598fe353d6e6b476e0a32bc1cf35.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controllere42a598fe353d6e6b476e0a32bc1cf35.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/positions'
 */
    const Controllere42a598fe353d6e6b476e0a32bc1cf35Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controllere42a598fe353d6e6b476e0a32bc1cf35.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/positions'
 */
        Controllere42a598fe353d6e6b476e0a32bc1cf35Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controllere42a598fe353d6e6b476e0a32bc1cf35.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/positions'
 */
        Controllere42a598fe353d6e6b476e0a32bc1cf35Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controllere42a598fe353d6e6b476e0a32bc1cf35.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controllere42a598fe353d6e6b476e0a32bc1cf35.form = Controllere42a598fe353d6e6b476e0a32bc1cf35Form
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/payees'
 */
const Controller06c64edef9d2c3cf9062ca36f36dbc75 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller06c64edef9d2c3cf9062ca36f36dbc75.url(options),
    method: 'get',
})

Controller06c64edef9d2c3cf9062ca36f36dbc75.definition = {
    methods: ["get","head"],
    url: '/payees',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/payees'
 */
Controller06c64edef9d2c3cf9062ca36f36dbc75.url = (options?: RouteQueryOptions) => {
    return Controller06c64edef9d2c3cf9062ca36f36dbc75.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/payees'
 */
Controller06c64edef9d2c3cf9062ca36f36dbc75.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller06c64edef9d2c3cf9062ca36f36dbc75.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/payees'
 */
Controller06c64edef9d2c3cf9062ca36f36dbc75.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller06c64edef9d2c3cf9062ca36f36dbc75.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/payees'
 */
    const Controller06c64edef9d2c3cf9062ca36f36dbc75Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller06c64edef9d2c3cf9062ca36f36dbc75.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/payees'
 */
        Controller06c64edef9d2c3cf9062ca36f36dbc75Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller06c64edef9d2c3cf9062ca36f36dbc75.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/payees'
 */
        Controller06c64edef9d2c3cf9062ca36f36dbc75Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller06c64edef9d2c3cf9062ca36f36dbc75.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller06c64edef9d2c3cf9062ca36f36dbc75.form = Controller06c64edef9d2c3cf9062ca36f36dbc75Form
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/form-types'
 */
const Controller8da6e7f77f70671de7d17b8fd7f3e5a3 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller8da6e7f77f70671de7d17b8fd7f3e5a3.url(options),
    method: 'get',
})

Controller8da6e7f77f70671de7d17b8fd7f3e5a3.definition = {
    methods: ["get","head"],
    url: '/form-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/form-types'
 */
Controller8da6e7f77f70671de7d17b8fd7f3e5a3.url = (options?: RouteQueryOptions) => {
    return Controller8da6e7f77f70671de7d17b8fd7f3e5a3.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/form-types'
 */
Controller8da6e7f77f70671de7d17b8fd7f3e5a3.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller8da6e7f77f70671de7d17b8fd7f3e5a3.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/form-types'
 */
Controller8da6e7f77f70671de7d17b8fd7f3e5a3.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller8da6e7f77f70671de7d17b8fd7f3e5a3.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/form-types'
 */
    const Controller8da6e7f77f70671de7d17b8fd7f3e5a3Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller8da6e7f77f70671de7d17b8fd7f3e5a3.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/form-types'
 */
        Controller8da6e7f77f70671de7d17b8fd7f3e5a3Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller8da6e7f77f70671de7d17b8fd7f3e5a3.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/form-types'
 */
        Controller8da6e7f77f70671de7d17b8fd7f3e5a3Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller8da6e7f77f70671de7d17b8fd7f3e5a3.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller8da6e7f77f70671de7d17b8fd7f3e5a3.form = Controller8da6e7f77f70671de7d17b8fd7f3e5a3Form
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/banks'
 */
const Controllerceb687e4469870e1601f6ea8564c7ddf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllerceb687e4469870e1601f6ea8564c7ddf.url(options),
    method: 'get',
})

Controllerceb687e4469870e1601f6ea8564c7ddf.definition = {
    methods: ["get","head"],
    url: '/banks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/banks'
 */
Controllerceb687e4469870e1601f6ea8564c7ddf.url = (options?: RouteQueryOptions) => {
    return Controllerceb687e4469870e1601f6ea8564c7ddf.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/banks'
 */
Controllerceb687e4469870e1601f6ea8564c7ddf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllerceb687e4469870e1601f6ea8564c7ddf.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/banks'
 */
Controllerceb687e4469870e1601f6ea8564c7ddf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controllerceb687e4469870e1601f6ea8564c7ddf.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/banks'
 */
    const Controllerceb687e4469870e1601f6ea8564c7ddfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controllerceb687e4469870e1601f6ea8564c7ddf.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/banks'
 */
        Controllerceb687e4469870e1601f6ea8564c7ddfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controllerceb687e4469870e1601f6ea8564c7ddf.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/banks'
 */
        Controllerceb687e4469870e1601f6ea8564c7ddfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controllerceb687e4469870e1601f6ea8564c7ddf.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controllerceb687e4469870e1601f6ea8564c7ddf.form = Controllerceb687e4469870e1601f6ea8564c7ddfForm
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/payors'
 */
const Controller4be3f4435dc0a7d47ac5cc7bebb121a7 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller4be3f4435dc0a7d47ac5cc7bebb121a7.url(options),
    method: 'get',
})

Controller4be3f4435dc0a7d47ac5cc7bebb121a7.definition = {
    methods: ["get","head"],
    url: '/payors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/payors'
 */
Controller4be3f4435dc0a7d47ac5cc7bebb121a7.url = (options?: RouteQueryOptions) => {
    return Controller4be3f4435dc0a7d47ac5cc7bebb121a7.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/payors'
 */
Controller4be3f4435dc0a7d47ac5cc7bebb121a7.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller4be3f4435dc0a7d47ac5cc7bebb121a7.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/payors'
 */
Controller4be3f4435dc0a7d47ac5cc7bebb121a7.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller4be3f4435dc0a7d47ac5cc7bebb121a7.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/payors'
 */
    const Controller4be3f4435dc0a7d47ac5cc7bebb121a7Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller4be3f4435dc0a7d47ac5cc7bebb121a7.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/payors'
 */
        Controller4be3f4435dc0a7d47ac5cc7bebb121a7Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller4be3f4435dc0a7d47ac5cc7bebb121a7.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/payors'
 */
        Controller4be3f4435dc0a7d47ac5cc7bebb121a7Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller4be3f4435dc0a7d47ac5cc7bebb121a7.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller4be3f4435dc0a7d47ac5cc7bebb121a7.form = Controller4be3f4435dc0a7d47ac5cc7bebb121a7Form
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/nature-of-collections'
 */
const Controller1daf189cc923223f3f2426e1d9427cd7 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller1daf189cc923223f3f2426e1d9427cd7.url(options),
    method: 'get',
})

Controller1daf189cc923223f3f2426e1d9427cd7.definition = {
    methods: ["get","head"],
    url: '/nature-of-collections',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/nature-of-collections'
 */
Controller1daf189cc923223f3f2426e1d9427cd7.url = (options?: RouteQueryOptions) => {
    return Controller1daf189cc923223f3f2426e1d9427cd7.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/nature-of-collections'
 */
Controller1daf189cc923223f3f2426e1d9427cd7.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller1daf189cc923223f3f2426e1d9427cd7.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/nature-of-collections'
 */
Controller1daf189cc923223f3f2426e1d9427cd7.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller1daf189cc923223f3f2426e1d9427cd7.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/nature-of-collections'
 */
    const Controller1daf189cc923223f3f2426e1d9427cd7Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller1daf189cc923223f3f2426e1d9427cd7.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/nature-of-collections'
 */
        Controller1daf189cc923223f3f2426e1d9427cd7Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller1daf189cc923223f3f2426e1d9427cd7.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/nature-of-collections'
 */
        Controller1daf189cc923223f3f2426e1d9427cd7Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller1daf189cc923223f3f2426e1d9427cd7.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller1daf189cc923223f3f2426e1d9427cd7.form = Controller1daf189cc923223f3f2426e1d9427cd7Form
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/jev-types'
 */
const Controllerb56388e58e3476d992f8bfd69994607d = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllerb56388e58e3476d992f8bfd69994607d.url(options),
    method: 'get',
})

Controllerb56388e58e3476d992f8bfd69994607d.definition = {
    methods: ["get","head"],
    url: '/jev-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/jev-types'
 */
Controllerb56388e58e3476d992f8bfd69994607d.url = (options?: RouteQueryOptions) => {
    return Controllerb56388e58e3476d992f8bfd69994607d.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/jev-types'
 */
Controllerb56388e58e3476d992f8bfd69994607d.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllerb56388e58e3476d992f8bfd69994607d.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/jev-types'
 */
Controllerb56388e58e3476d992f8bfd69994607d.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controllerb56388e58e3476d992f8bfd69994607d.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/jev-types'
 */
    const Controllerb56388e58e3476d992f8bfd69994607dForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controllerb56388e58e3476d992f8bfd69994607d.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/jev-types'
 */
        Controllerb56388e58e3476d992f8bfd69994607dForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controllerb56388e58e3476d992f8bfd69994607d.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/jev-types'
 */
        Controllerb56388e58e3476d992f8bfd69994607dForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controllerb56388e58e3476d992f8bfd69994607d.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controllerb56388e58e3476d992f8bfd69994607d.form = Controllerb56388e58e3476d992f8bfd69994607dForm
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/fiscal-years'
 */
const Controller83daebdc99e9fe97c9afd1cd5aee8b63 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller83daebdc99e9fe97c9afd1cd5aee8b63.url(options),
    method: 'get',
})

Controller83daebdc99e9fe97c9afd1cd5aee8b63.definition = {
    methods: ["get","head"],
    url: '/fiscal-years',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/fiscal-years'
 */
Controller83daebdc99e9fe97c9afd1cd5aee8b63.url = (options?: RouteQueryOptions) => {
    return Controller83daebdc99e9fe97c9afd1cd5aee8b63.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/fiscal-years'
 */
Controller83daebdc99e9fe97c9afd1cd5aee8b63.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller83daebdc99e9fe97c9afd1cd5aee8b63.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/fiscal-years'
 */
Controller83daebdc99e9fe97c9afd1cd5aee8b63.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller83daebdc99e9fe97c9afd1cd5aee8b63.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/fiscal-years'
 */
    const Controller83daebdc99e9fe97c9afd1cd5aee8b63Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller83daebdc99e9fe97c9afd1cd5aee8b63.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/fiscal-years'
 */
        Controller83daebdc99e9fe97c9afd1cd5aee8b63Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller83daebdc99e9fe97c9afd1cd5aee8b63.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/fiscal-years'
 */
        Controller83daebdc99e9fe97c9afd1cd5aee8b63Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller83daebdc99e9fe97c9afd1cd5aee8b63.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller83daebdc99e9fe97c9afd1cd5aee8b63.form = Controller83daebdc99e9fe97c9afd1cd5aee8b63Form
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/program-categories'
 */
const Controller20eb94cba18b0f4f0e49af95bef15dbb = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller20eb94cba18b0f4f0e49af95bef15dbb.url(options),
    method: 'get',
})

Controller20eb94cba18b0f4f0e49af95bef15dbb.definition = {
    methods: ["get","head"],
    url: '/program-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/program-categories'
 */
Controller20eb94cba18b0f4f0e49af95bef15dbb.url = (options?: RouteQueryOptions) => {
    return Controller20eb94cba18b0f4f0e49af95bef15dbb.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/program-categories'
 */
Controller20eb94cba18b0f4f0e49af95bef15dbb.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller20eb94cba18b0f4f0e49af95bef15dbb.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/program-categories'
 */
Controller20eb94cba18b0f4f0e49af95bef15dbb.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller20eb94cba18b0f4f0e49af95bef15dbb.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/program-categories'
 */
    const Controller20eb94cba18b0f4f0e49af95bef15dbbForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller20eb94cba18b0f4f0e49af95bef15dbb.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/program-categories'
 */
        Controller20eb94cba18b0f4f0e49af95bef15dbbForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller20eb94cba18b0f4f0e49af95bef15dbb.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/program-categories'
 */
        Controller20eb94cba18b0f4f0e49af95bef15dbbForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller20eb94cba18b0f4f0e49af95bef15dbb.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller20eb94cba18b0f4f0e49af95bef15dbb.form = Controller20eb94cba18b0f4f0e49af95bef15dbbForm
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/expense-categories'
 */
const Controller251e249441e1e85d36d79500ab0ed79d = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller251e249441e1e85d36d79500ab0ed79d.url(options),
    method: 'get',
})

Controller251e249441e1e85d36d79500ab0ed79d.definition = {
    methods: ["get","head"],
    url: '/expense-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/expense-categories'
 */
Controller251e249441e1e85d36d79500ab0ed79d.url = (options?: RouteQueryOptions) => {
    return Controller251e249441e1e85d36d79500ab0ed79d.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/expense-categories'
 */
Controller251e249441e1e85d36d79500ab0ed79d.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller251e249441e1e85d36d79500ab0ed79d.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/expense-categories'
 */
Controller251e249441e1e85d36d79500ab0ed79d.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller251e249441e1e85d36d79500ab0ed79d.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/expense-categories'
 */
    const Controller251e249441e1e85d36d79500ab0ed79dForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller251e249441e1e85d36d79500ab0ed79d.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/expense-categories'
 */
        Controller251e249441e1e85d36d79500ab0ed79dForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller251e249441e1e85d36d79500ab0ed79d.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/expense-categories'
 */
        Controller251e249441e1e85d36d79500ab0ed79dForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller251e249441e1e85d36d79500ab0ed79d.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller251e249441e1e85d36d79500ab0ed79d.form = Controller251e249441e1e85d36d79500ab0ed79dForm
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/funding-sources'
 */
const Controllerc4e20773d53007929016887cb8dd06df = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllerc4e20773d53007929016887cb8dd06df.url(options),
    method: 'get',
})

Controllerc4e20773d53007929016887cb8dd06df.definition = {
    methods: ["get","head"],
    url: '/funding-sources',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/funding-sources'
 */
Controllerc4e20773d53007929016887cb8dd06df.url = (options?: RouteQueryOptions) => {
    return Controllerc4e20773d53007929016887cb8dd06df.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/funding-sources'
 */
Controllerc4e20773d53007929016887cb8dd06df.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllerc4e20773d53007929016887cb8dd06df.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/funding-sources'
 */
Controllerc4e20773d53007929016887cb8dd06df.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controllerc4e20773d53007929016887cb8dd06df.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/funding-sources'
 */
    const Controllerc4e20773d53007929016887cb8dd06dfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controllerc4e20773d53007929016887cb8dd06df.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/funding-sources'
 */
        Controllerc4e20773d53007929016887cb8dd06dfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controllerc4e20773d53007929016887cb8dd06df.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/funding-sources'
 */
        Controllerc4e20773d53007929016887cb8dd06dfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controllerc4e20773d53007929016887cb8dd06df.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controllerc4e20773d53007929016887cb8dd06df.form = Controllerc4e20773d53007929016887cb8dd06dfForm
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budget-classifications'
 */
const Controller8ba4b12b586444b8f842d2047f89bbcf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller8ba4b12b586444b8f842d2047f89bbcf.url(options),
    method: 'get',
})

Controller8ba4b12b586444b8f842d2047f89bbcf.definition = {
    methods: ["get","head"],
    url: '/budget-classifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budget-classifications'
 */
Controller8ba4b12b586444b8f842d2047f89bbcf.url = (options?: RouteQueryOptions) => {
    return Controller8ba4b12b586444b8f842d2047f89bbcf.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budget-classifications'
 */
Controller8ba4b12b586444b8f842d2047f89bbcf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller8ba4b12b586444b8f842d2047f89bbcf.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budget-classifications'
 */
Controller8ba4b12b586444b8f842d2047f89bbcf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller8ba4b12b586444b8f842d2047f89bbcf.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budget-classifications'
 */
    const Controller8ba4b12b586444b8f842d2047f89bbcfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller8ba4b12b586444b8f842d2047f89bbcf.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budget-classifications'
 */
        Controller8ba4b12b586444b8f842d2047f89bbcfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller8ba4b12b586444b8f842d2047f89bbcf.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budget-classifications'
 */
        Controller8ba4b12b586444b8f842d2047f89bbcfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller8ba4b12b586444b8f842d2047f89bbcf.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller8ba4b12b586444b8f842d2047f89bbcf.form = Controller8ba4b12b586444b8f842d2047f89bbcfForm
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/responsibility-centers'
 */
const Controller870dd67fef659072abb5f25beb9f8d24 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller870dd67fef659072abb5f25beb9f8d24.url(options),
    method: 'get',
})

Controller870dd67fef659072abb5f25beb9f8d24.definition = {
    methods: ["get","head"],
    url: '/responsibility-centers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/responsibility-centers'
 */
Controller870dd67fef659072abb5f25beb9f8d24.url = (options?: RouteQueryOptions) => {
    return Controller870dd67fef659072abb5f25beb9f8d24.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/responsibility-centers'
 */
Controller870dd67fef659072abb5f25beb9f8d24.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller870dd67fef659072abb5f25beb9f8d24.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/responsibility-centers'
 */
Controller870dd67fef659072abb5f25beb9f8d24.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller870dd67fef659072abb5f25beb9f8d24.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/responsibility-centers'
 */
    const Controller870dd67fef659072abb5f25beb9f8d24Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller870dd67fef659072abb5f25beb9f8d24.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/responsibility-centers'
 */
        Controller870dd67fef659072abb5f25beb9f8d24Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller870dd67fef659072abb5f25beb9f8d24.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/responsibility-centers'
 */
        Controller870dd67fef659072abb5f25beb9f8d24Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller870dd67fef659072abb5f25beb9f8d24.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller870dd67fef659072abb5f25beb9f8d24.form = Controller870dd67fef659072abb5f25beb9f8d24Form
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/approval-routes'
 */
const Controller211c05173176fbabf0558de90423d9f5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller211c05173176fbabf0558de90423d9f5.url(options),
    method: 'get',
})

Controller211c05173176fbabf0558de90423d9f5.definition = {
    methods: ["get","head"],
    url: '/approval-routes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/approval-routes'
 */
Controller211c05173176fbabf0558de90423d9f5.url = (options?: RouteQueryOptions) => {
    return Controller211c05173176fbabf0558de90423d9f5.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/approval-routes'
 */
Controller211c05173176fbabf0558de90423d9f5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller211c05173176fbabf0558de90423d9f5.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/approval-routes'
 */
Controller211c05173176fbabf0558de90423d9f5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller211c05173176fbabf0558de90423d9f5.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/approval-routes'
 */
    const Controller211c05173176fbabf0558de90423d9f5Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller211c05173176fbabf0558de90423d9f5.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/approval-routes'
 */
        Controller211c05173176fbabf0558de90423d9f5Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller211c05173176fbabf0558de90423d9f5.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/approval-routes'
 */
        Controller211c05173176fbabf0558de90423d9f5Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller211c05173176fbabf0558de90423d9f5.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller211c05173176fbabf0558de90423d9f5.form = Controller211c05173176fbabf0558de90423d9f5Form
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/chart-of-accounts'
 */
const Controllerc597be26c2277577204f047010dbbc0d = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllerc597be26c2277577204f047010dbbc0d.url(options),
    method: 'get',
})

Controllerc597be26c2277577204f047010dbbc0d.definition = {
    methods: ["get","head"],
    url: '/chart-of-accounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/chart-of-accounts'
 */
Controllerc597be26c2277577204f047010dbbc0d.url = (options?: RouteQueryOptions) => {
    return Controllerc597be26c2277577204f047010dbbc0d.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/chart-of-accounts'
 */
Controllerc597be26c2277577204f047010dbbc0d.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllerc597be26c2277577204f047010dbbc0d.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/chart-of-accounts'
 */
Controllerc597be26c2277577204f047010dbbc0d.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controllerc597be26c2277577204f047010dbbc0d.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/chart-of-accounts'
 */
    const Controllerc597be26c2277577204f047010dbbc0dForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controllerc597be26c2277577204f047010dbbc0d.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/chart-of-accounts'
 */
        Controllerc597be26c2277577204f047010dbbc0dForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controllerc597be26c2277577204f047010dbbc0d.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/chart-of-accounts'
 */
        Controllerc597be26c2277577204f047010dbbc0dForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controllerc597be26c2277577204f047010dbbc0d.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controllerc597be26c2277577204f047010dbbc0d.form = Controllerc597be26c2277577204f047010dbbc0dForm
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/barangays'
 */
const Controller38af39c2bc60b4f0b38cb7866969dbdb = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller38af39c2bc60b4f0b38cb7866969dbdb.url(options),
    method: 'get',
})

Controller38af39c2bc60b4f0b38cb7866969dbdb.definition = {
    methods: ["get","head"],
    url: '/barangays',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/barangays'
 */
Controller38af39c2bc60b4f0b38cb7866969dbdb.url = (options?: RouteQueryOptions) => {
    return Controller38af39c2bc60b4f0b38cb7866969dbdb.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/barangays'
 */
Controller38af39c2bc60b4f0b38cb7866969dbdb.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller38af39c2bc60b4f0b38cb7866969dbdb.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/barangays'
 */
Controller38af39c2bc60b4f0b38cb7866969dbdb.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller38af39c2bc60b4f0b38cb7866969dbdb.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/barangays'
 */
    const Controller38af39c2bc60b4f0b38cb7866969dbdbForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller38af39c2bc60b4f0b38cb7866969dbdb.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/barangays'
 */
        Controller38af39c2bc60b4f0b38cb7866969dbdbForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller38af39c2bc60b4f0b38cb7866969dbdb.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/barangays'
 */
        Controller38af39c2bc60b4f0b38cb7866969dbdbForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller38af39c2bc60b4f0b38cb7866969dbdb.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller38af39c2bc60b4f0b38cb7866969dbdb.form = Controller38af39c2bc60b4f0b38cb7866969dbdbForm
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/barangays/create'
 */
const Controller8339a7749a7ae1e8353d00fcd07ec22c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller8339a7749a7ae1e8353d00fcd07ec22c.url(options),
    method: 'get',
})

Controller8339a7749a7ae1e8353d00fcd07ec22c.definition = {
    methods: ["get","head"],
    url: '/barangays/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/barangays/create'
 */
Controller8339a7749a7ae1e8353d00fcd07ec22c.url = (options?: RouteQueryOptions) => {
    return Controller8339a7749a7ae1e8353d00fcd07ec22c.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/barangays/create'
 */
Controller8339a7749a7ae1e8353d00fcd07ec22c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller8339a7749a7ae1e8353d00fcd07ec22c.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/barangays/create'
 */
Controller8339a7749a7ae1e8353d00fcd07ec22c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller8339a7749a7ae1e8353d00fcd07ec22c.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/barangays/create'
 */
    const Controller8339a7749a7ae1e8353d00fcd07ec22cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller8339a7749a7ae1e8353d00fcd07ec22c.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/barangays/create'
 */
        Controller8339a7749a7ae1e8353d00fcd07ec22cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller8339a7749a7ae1e8353d00fcd07ec22c.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/barangays/create'
 */
        Controller8339a7749a7ae1e8353d00fcd07ec22cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller8339a7749a7ae1e8353d00fcd07ec22c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller8339a7749a7ae1e8353d00fcd07ec22c.form = Controller8339a7749a7ae1e8353d00fcd07ec22cForm
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budgets'
 */
const Controllerd65bcf739ad2a9a13b6c3c100ab1c5e2 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllerd65bcf739ad2a9a13b6c3c100ab1c5e2.url(options),
    method: 'get',
})

Controllerd65bcf739ad2a9a13b6c3c100ab1c5e2.definition = {
    methods: ["get","head"],
    url: '/budgets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budgets'
 */
Controllerd65bcf739ad2a9a13b6c3c100ab1c5e2.url = (options?: RouteQueryOptions) => {
    return Controllerd65bcf739ad2a9a13b6c3c100ab1c5e2.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budgets'
 */
Controllerd65bcf739ad2a9a13b6c3c100ab1c5e2.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllerd65bcf739ad2a9a13b6c3c100ab1c5e2.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budgets'
 */
Controllerd65bcf739ad2a9a13b6c3c100ab1c5e2.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controllerd65bcf739ad2a9a13b6c3c100ab1c5e2.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budgets'
 */
    const Controllerd65bcf739ad2a9a13b6c3c100ab1c5e2Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controllerd65bcf739ad2a9a13b6c3c100ab1c5e2.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budgets'
 */
        Controllerd65bcf739ad2a9a13b6c3c100ab1c5e2Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controllerd65bcf739ad2a9a13b6c3c100ab1c5e2.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budgets'
 */
        Controllerd65bcf739ad2a9a13b6c3c100ab1c5e2Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controllerd65bcf739ad2a9a13b6c3c100ab1c5e2.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controllerd65bcf739ad2a9a13b6c3c100ab1c5e2.form = Controllerd65bcf739ad2a9a13b6c3c100ab1c5e2Form
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budgets/create'
 */
const Controller91666a90e3e3fc2c8cfc43356700fbfc = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller91666a90e3e3fc2c8cfc43356700fbfc.url(options),
    method: 'get',
})

Controller91666a90e3e3fc2c8cfc43356700fbfc.definition = {
    methods: ["get","head"],
    url: '/budgets/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budgets/create'
 */
Controller91666a90e3e3fc2c8cfc43356700fbfc.url = (options?: RouteQueryOptions) => {
    return Controller91666a90e3e3fc2c8cfc43356700fbfc.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budgets/create'
 */
Controller91666a90e3e3fc2c8cfc43356700fbfc.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller91666a90e3e3fc2c8cfc43356700fbfc.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budgets/create'
 */
Controller91666a90e3e3fc2c8cfc43356700fbfc.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller91666a90e3e3fc2c8cfc43356700fbfc.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budgets/create'
 */
    const Controller91666a90e3e3fc2c8cfc43356700fbfcForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller91666a90e3e3fc2c8cfc43356700fbfc.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budgets/create'
 */
        Controller91666a90e3e3fc2c8cfc43356700fbfcForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller91666a90e3e3fc2c8cfc43356700fbfc.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/budgets/create'
 */
        Controller91666a90e3e3fc2c8cfc43356700fbfcForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller91666a90e3e3fc2c8cfc43356700fbfc.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller91666a90e3e3fc2c8cfc43356700fbfc.form = Controller91666a90e3e3fc2c8cfc43356700fbfcForm
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/settings'
 */
const Controller4b87d2df7e3aa853f6720faea796e36c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'get',
})

Controller4b87d2df7e3aa853f6720faea796e36c.definition = {
    methods: ["get","head"],
    url: '/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/settings'
 */
Controller4b87d2df7e3aa853f6720faea796e36c.url = (options?: RouteQueryOptions) => {
    return Controller4b87d2df7e3aa853f6720faea796e36c.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/settings'
 */
Controller4b87d2df7e3aa853f6720faea796e36c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/settings'
 */
Controller4b87d2df7e3aa853f6720faea796e36c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/settings'
 */
    const Controller4b87d2df7e3aa853f6720faea796e36cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller4b87d2df7e3aa853f6720faea796e36c.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/settings'
 */
        Controller4b87d2df7e3aa853f6720faea796e36cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller4b87d2df7e3aa853f6720faea796e36c.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/settings'
 */
        Controller4b87d2df7e3aa853f6720faea796e36cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller4b87d2df7e3aa853f6720faea796e36c.form = Controller4b87d2df7e3aa853f6720faea796e36cForm

/**
* Multiple routes resolve to \Inertia\Controller::Controller, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `Controller['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
const Controller = {
    '/': Controller980bb49ee7ae63891f1d891d2fbcf1c9,
    '/home': Controller8916cc3023b81e31fc622dbbe33246b8,
    '/dashboard': Controller42a740574ecbfbac32f8cc353fc32db9,
    '/municipal-information': Controllere725465242cb0dd0361698ef59e93971,
    '/positions': Controllere42a598fe353d6e6b476e0a32bc1cf35,
    '/payees': Controller06c64edef9d2c3cf9062ca36f36dbc75,
    '/form-types': Controller8da6e7f77f70671de7d17b8fd7f3e5a3,
    '/banks': Controllerceb687e4469870e1601f6ea8564c7ddf,
    '/payors': Controller4be3f4435dc0a7d47ac5cc7bebb121a7,
    '/nature-of-collections': Controller1daf189cc923223f3f2426e1d9427cd7,
    '/jev-types': Controllerb56388e58e3476d992f8bfd69994607d,
    '/fiscal-years': Controller83daebdc99e9fe97c9afd1cd5aee8b63,
    '/program-categories': Controller20eb94cba18b0f4f0e49af95bef15dbb,
    '/expense-categories': Controller251e249441e1e85d36d79500ab0ed79d,
    '/funding-sources': Controllerc4e20773d53007929016887cb8dd06df,
    '/budget-classifications': Controller8ba4b12b586444b8f842d2047f89bbcf,
    '/responsibility-centers': Controller870dd67fef659072abb5f25beb9f8d24,
    '/approval-routes': Controller211c05173176fbabf0558de90423d9f5,
    '/chart-of-accounts': Controllerc597be26c2277577204f047010dbbc0d,
    '/barangays': Controller38af39c2bc60b4f0b38cb7866969dbdb,
    '/barangays/create': Controller8339a7749a7ae1e8353d00fcd07ec22c,
    '/budgets': Controllerd65bcf739ad2a9a13b6c3c100ab1c5e2,
    '/budgets/create': Controller91666a90e3e3fc2c8cfc43356700fbfc,
    '/settings': Controller4b87d2df7e3aa853f6720faea796e36c,
}

export default Controller