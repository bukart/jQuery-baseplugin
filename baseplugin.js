/**
 * A standard structure for jQuery plugins
 *
 * @name baseplugin
 * @version 1.0.0
 * @requires jQuery v1.7.0+
 * @author Burkhard Krethlow
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2012, Burkhard Krethlow (buk -[at]- bukart [*dot*] de)
 */


/* you can remove all comments marked like this one, and you'll get the code without explanations */

;( function ( $ )
{

    // *********************************************************************************************
    // >>>> NAMESPACE STUFF >>>>

    var _NSPC_ = '.baseplugin';     /* typically used for (un)binding events by this plugin       */
    var _NAME_ = 'baseplugin';      /* identifies the plugin in any way                           */
    var _DATA_ = _NSPC_ + '.data';  /* typically used to (un)bind data by this plugin             */

    // <<<< NAMESPACE STUFF <<<<
    // *********************************************************************************************


    // *********************************************************************************************
    // >>>> THE PLUGIN CLASS ITSELF >>>>

    /* this class will be instantiated later by the intrinsic plugin for each occurrence          */
    function baseplugin()
    {

        var self = this;

        // *****************************************************************************************
        // >>>> DEFINITIONS >>>>

        // all these options can be changed with the option parameter from init()
        var defaultOptions =
        {
            'foo'   : 'bar'
        };
        // end of defaultOptions


        // internal essential options, these options overides some given default options !
        var settings =
        {
            'some'  :
            {
                'internal'  : 'settings',
                'you'       : 'wont'
            },
            'to'    :
            {
                'be'        : 'overrided',
                'by'        : 'the user'
            }
        };
        // end of settings


        // helper object to organize the plugin's methods
        /* in effect, it isn't necessary to use or bind anything to methods.private, except for   */
        /* you want to call the methods this way                                                  */
        var methods = this.methods =
        {
            'public'                : {},
            'private'               : {}
        };


        // helper object to organize the components, i.e. the involved DOM objects
        /* it's your decission to use this one                                                    */
        var components =
        {
            '$container'            : null, /* some demo entries                                  */
            '$otherstuff'           : null  /* some demo entries                                  */
        };


        // contains all calculated and variable values while running the plugin
        /* saves the really interresting values, it also depend on you, to make use of it         */
        var status =
        {
            'items'                 : 0,    /* some demo entries                                  */
            'dragging'              : false /* some demo entries                                  */
        };
        // end of status

        // <<<< DEFINITIONS <<<<
        // *****************************************************************************************


        // *****************************************************************************************
        // >>>> THE "PRIVATES" >>>>

        /* to identify "private" functions, they starts with an underscore                        */
        var _px2number
            = methods.private.px2number
            = function( val )
        {
            if ( 'number' == typeof val )
            {
                return val;
            }
            var foo = val.replace( /^([+-]?\d+(?:\.\d+)?)px$/, '\1' );
            var bar = parseInt( foo, 10 );
            if ( bar == foo ) {
                return bar;
            }
            return false;
        }; // var _px2number = function( val )


        // <<<< THE "PRIVATES" <<<<
        // *****************************************************************************************




        // *****************************************************************************************
        // >>>> THE PUBLIC ONES >>>>


        /* this "public" method is called by default, if the plugin is being started, it prepares */
        /* the things for your plugin                                                             */
        var init
            = methods.public.init
            = function ( options )
        {
            var $this = this;

            /* do anything you want here                                                          */

            return $this;
        }; // var init = function ( options )


        /* public functions must be assigned to methods.public, the name below this is your       */
        /* choice, it can differ from the internal function name                                  */
        var stop
            = methods.public.stop
            = function()
        {
            parts.$container.stop();
        }; // var stop = function()


        // <<<< THE PUBLIC ONES <<<<
        // *****************************************************************************************
    } // function baseplugin()

    // <<<< THE PLUGIN CLASS ITSELF <<<<
    // *********************************************************************************************


    // *********************************************************************************************
    // >>>> PLUG IN THE PLUGIN >>>>

    /* here starts the "real" plugin, just add the public name of the plugin to $.fn              */
    $.fn.baseplugin = function( method )
    {
        var $this = this;

        var firstreturn = null;

        var args = arguments;

        $this.each( function ()
        {
            var $this = $( this );

            var plugin = $this.data( _NSPC_ );
            if ( 'undefined' == typeof plugin )
            {
                plugin = new baseplugin();
                $this.data( _NSPC_, plugin );
            }

            if ( plugin.methods.public[ method ] )
            {
                var ret = plugin.methods.public[ method ].apply( $this, Array.prototype.slice.call( args, 1 ) );
                firstreturn = ( null !== firstreturn ) ? firstreturn : ret;
            }
            else if ( 'object' == typeof method || !method )
            {
                var ret = plugin.methods.public.init.apply( $this, args );
                firstreturn = ( null !== firstreturn ) ? firstreturn : ret;
            } else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.' + _NAME_ );
            }
        } );

        return firstreturn;
    }; // $.fn.basepluging = function( method )

    // <<<< PLUG IN THE PLUGIN <<<<
    // *********************************************************************************************
}
( jQuery ) );