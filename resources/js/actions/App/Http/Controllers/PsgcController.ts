import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:15
 * @route '/psgc/regions'
 */
export const regions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regions.url(options),
    method: 'get',
})

regions.definition = {
    methods: ["get","head"],
    url: '/psgc/regions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:15
 * @route '/psgc/regions'
 */
regions.url = (options?: RouteQueryOptions) => {
    return regions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:15
 * @route '/psgc/regions'
 */
regions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:15
 * @route '/psgc/regions'
 */
regions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: regions.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:15
 * @route '/psgc/regions'
 */
    const regionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: regions.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:15
 * @route '/psgc/regions'
 */
        regionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: regions.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:15
 * @route '/psgc/regions'
 */
        regionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: regions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    regions.form = regionsForm
/**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:20
 * @route '/psgc/regions/{region}/provinces'
 */
export const provinces = (args: { region: string | number } | [region: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provinces.url(args, options),
    method: 'get',
})

provinces.definition = {
    methods: ["get","head"],
    url: '/psgc/regions/{region}/provinces',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:20
 * @route '/psgc/regions/{region}/provinces'
 */
provinces.url = (args: { region: string | number } | [region: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { region: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    region: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        region: args.region,
                }

    return provinces.definition.url
            .replace('{region}', parsedArgs.region.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:20
 * @route '/psgc/regions/{region}/provinces'
 */
provinces.get = (args: { region: string | number } | [region: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provinces.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:20
 * @route '/psgc/regions/{region}/provinces'
 */
provinces.head = (args: { region: string | number } | [region: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: provinces.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:20
 * @route '/psgc/regions/{region}/provinces'
 */
    const provincesForm = (args: { region: string | number } | [region: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: provinces.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:20
 * @route '/psgc/regions/{region}/provinces'
 */
        provincesForm.get = (args: { region: string | number } | [region: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: provinces.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:20
 * @route '/psgc/regions/{region}/provinces'
 */
        provincesForm.head = (args: { region: string | number } | [region: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: provinces.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    provinces.form = provincesForm
/**
* @see \App\Http\Controllers\PsgcController::regionCitiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:25
 * @route '/psgc/regions/{region}/cities-municipalities'
 */
export const regionCitiesMunicipalities = (args: { region: string | number } | [region: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regionCitiesMunicipalities.url(args, options),
    method: 'get',
})

regionCitiesMunicipalities.definition = {
    methods: ["get","head"],
    url: '/psgc/regions/{region}/cities-municipalities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsgcController::regionCitiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:25
 * @route '/psgc/regions/{region}/cities-municipalities'
 */
regionCitiesMunicipalities.url = (args: { region: string | number } | [region: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { region: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    region: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        region: args.region,
                }

    return regionCitiesMunicipalities.definition.url
            .replace('{region}', parsedArgs.region.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsgcController::regionCitiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:25
 * @route '/psgc/regions/{region}/cities-municipalities'
 */
regionCitiesMunicipalities.get = (args: { region: string | number } | [region: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regionCitiesMunicipalities.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PsgcController::regionCitiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:25
 * @route '/psgc/regions/{region}/cities-municipalities'
 */
regionCitiesMunicipalities.head = (args: { region: string | number } | [region: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: regionCitiesMunicipalities.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PsgcController::regionCitiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:25
 * @route '/psgc/regions/{region}/cities-municipalities'
 */
    const regionCitiesMunicipalitiesForm = (args: { region: string | number } | [region: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: regionCitiesMunicipalities.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PsgcController::regionCitiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:25
 * @route '/psgc/regions/{region}/cities-municipalities'
 */
        regionCitiesMunicipalitiesForm.get = (args: { region: string | number } | [region: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: regionCitiesMunicipalities.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PsgcController::regionCitiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:25
 * @route '/psgc/regions/{region}/cities-municipalities'
 */
        regionCitiesMunicipalitiesForm.head = (args: { region: string | number } | [region: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: regionCitiesMunicipalities.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    regionCitiesMunicipalities.form = regionCitiesMunicipalitiesForm
/**
* @see \App\Http\Controllers\PsgcController::citiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:30
 * @route '/psgc/provinces/{province}/cities-municipalities'
 */
export const citiesMunicipalities = (args: { province: string | number } | [province: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: citiesMunicipalities.url(args, options),
    method: 'get',
})

citiesMunicipalities.definition = {
    methods: ["get","head"],
    url: '/psgc/provinces/{province}/cities-municipalities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsgcController::citiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:30
 * @route '/psgc/provinces/{province}/cities-municipalities'
 */
citiesMunicipalities.url = (args: { province: string | number } | [province: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { province: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    province: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        province: args.province,
                }

    return citiesMunicipalities.definition.url
            .replace('{province}', parsedArgs.province.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsgcController::citiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:30
 * @route '/psgc/provinces/{province}/cities-municipalities'
 */
citiesMunicipalities.get = (args: { province: string | number } | [province: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: citiesMunicipalities.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PsgcController::citiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:30
 * @route '/psgc/provinces/{province}/cities-municipalities'
 */
citiesMunicipalities.head = (args: { province: string | number } | [province: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: citiesMunicipalities.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PsgcController::citiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:30
 * @route '/psgc/provinces/{province}/cities-municipalities'
 */
    const citiesMunicipalitiesForm = (args: { province: string | number } | [province: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: citiesMunicipalities.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PsgcController::citiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:30
 * @route '/psgc/provinces/{province}/cities-municipalities'
 */
        citiesMunicipalitiesForm.get = (args: { province: string | number } | [province: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: citiesMunicipalities.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PsgcController::citiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:30
 * @route '/psgc/provinces/{province}/cities-municipalities'
 */
        citiesMunicipalitiesForm.head = (args: { province: string | number } | [province: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: citiesMunicipalities.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    citiesMunicipalities.form = citiesMunicipalitiesForm
/**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:35
 * @route '/psgc/cities-municipalities/{cityMunicipality}/barangays'
 */
export const barangays = (args: { cityMunicipality: string | number } | [cityMunicipality: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: barangays.url(args, options),
    method: 'get',
})

barangays.definition = {
    methods: ["get","head"],
    url: '/psgc/cities-municipalities/{cityMunicipality}/barangays',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:35
 * @route '/psgc/cities-municipalities/{cityMunicipality}/barangays'
 */
barangays.url = (args: { cityMunicipality: string | number } | [cityMunicipality: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cityMunicipality: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    cityMunicipality: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        cityMunicipality: args.cityMunicipality,
                }

    return barangays.definition.url
            .replace('{cityMunicipality}', parsedArgs.cityMunicipality.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:35
 * @route '/psgc/cities-municipalities/{cityMunicipality}/barangays'
 */
barangays.get = (args: { cityMunicipality: string | number } | [cityMunicipality: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: barangays.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:35
 * @route '/psgc/cities-municipalities/{cityMunicipality}/barangays'
 */
barangays.head = (args: { cityMunicipality: string | number } | [cityMunicipality: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: barangays.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:35
 * @route '/psgc/cities-municipalities/{cityMunicipality}/barangays'
 */
    const barangaysForm = (args: { cityMunicipality: string | number } | [cityMunicipality: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: barangays.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:35
 * @route '/psgc/cities-municipalities/{cityMunicipality}/barangays'
 */
        barangaysForm.get = (args: { cityMunicipality: string | number } | [cityMunicipality: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: barangays.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:35
 * @route '/psgc/cities-municipalities/{cityMunicipality}/barangays'
 */
        barangaysForm.head = (args: { cityMunicipality: string | number } | [cityMunicipality: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: barangays.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    barangays.form = barangaysForm
/**
* @see \App\Http\Controllers\PsgcController::postalCode
 * @see app/Http/Controllers/PsgcController.php:40
 * @route '/psgc/postal-code'
 */
export const postalCode = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: postalCode.url(options),
    method: 'get',
})

postalCode.definition = {
    methods: ["get","head"],
    url: '/psgc/postal-code',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsgcController::postalCode
 * @see app/Http/Controllers/PsgcController.php:40
 * @route '/psgc/postal-code'
 */
postalCode.url = (options?: RouteQueryOptions) => {
    return postalCode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsgcController::postalCode
 * @see app/Http/Controllers/PsgcController.php:40
 * @route '/psgc/postal-code'
 */
postalCode.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: postalCode.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PsgcController::postalCode
 * @see app/Http/Controllers/PsgcController.php:40
 * @route '/psgc/postal-code'
 */
postalCode.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: postalCode.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PsgcController::postalCode
 * @see app/Http/Controllers/PsgcController.php:40
 * @route '/psgc/postal-code'
 */
    const postalCodeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: postalCode.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PsgcController::postalCode
 * @see app/Http/Controllers/PsgcController.php:40
 * @route '/psgc/postal-code'
 */
        postalCodeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: postalCode.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PsgcController::postalCode
 * @see app/Http/Controllers/PsgcController.php:40
 * @route '/psgc/postal-code'
 */
        postalCodeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: postalCode.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    postalCode.form = postalCodeForm
const PsgcController = { regions, provinces, regionCitiesMunicipalities, citiesMunicipalities, barangays, postalCode }

export default PsgcController