Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.form.*'
]);

Ext.application({
    name: 'PersonlistApp',
    models: ['Person', 'Education'],

    launch: function () {

        Ext.define('Person', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'fullname', type: 'string'},
                {name: 'education', type: 'string'},
                {name: 'city', type: 'string'}
            ]
        });

        var personStore = Ext.create('Ext.data.Store', {
            model: 'Person',
            pageSize: 5,
            proxy: {
                type: 'ajax',
                url: 'person',
                actionMethods: {
                    read: 'POST'
                },
                reader: {
                    type: 'json',
                    root: 'p',
                    totalProperty: 'total'
                }
            },
            autoLoad: true
        });

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });


        var personPanel = new Ext.grid.Panel({
            frame: true,
            xtype: 'grid',
            store: personStore,
            width: '100%',
            height: 400,
            title: 'Users',
            columns: [
                {
                    text: 'Name',
                    width: 90,
                    sortable: false,
                    hideable: false,
                    dataIndex: 'fullname',
                    editor: {
                        // defaults to textfield if no xtype is supplied
                        allowBlank: false
                    }
                },
                {
                    text: 'Education',
                    flex: 1,
                    dataIndex: 'education',
                    editor: {
                        // defaults to textfield if no xtype is supplied
                        allowBlank: false
                        /*
                         xtype:'combo',
                         fieldLabel:'Division',
                         name:'division',
                         queryMode:'local',
                         store:['A','B','C'],
                         displayField:'division',
                         autoSelect:true,
                         forceSelection:true
                         */
                    }
                },
                {
                    text: 'Cities',
                    flex: 1,
                    dataIndex: 'city',
                    editor: {
                        // defaults to textfield if no xtype is supplied
                        allowBlank: false
                    }
                }
            ],
            tbar: [{
                text: 'Add Employee',
                iconCls: 'employee-add',
                handler: function () {
                    rowEditing.cancelEdit();

                    // Create a model instance
                    var r = Ext.create('Employee', {
                        fullname: 'New Guy',
                        education: 'A',
                        city: 'newOrlean'
                    });

                    personStore.insert(0, r);
                    rowEditing.startEdit(0, 0);
                }
            }, {
                itemId: 'removeEmployee',
                text: 'Remove Employee',
                iconCls: 'employee-remove',
                handler: function () {
                    var sm = grid.getSelectionModel();
                    rowEditing.cancelEdit();
                    personStore.remove(sm.getSelection());
                    if (personStore.getCount() > 0) {
                        sm.select(0);
                    }
                },
                disabled: true
            }],
            plugins: [rowEditing],
            listeners: {
                'selectionchange': function (view, records) {
                    grid.down('#removeEmployee').setDisabled(!records.length);
                }
            }

        });


        var educationSelectForm = new Ext.form.Panel({

            bodyPadding: 10,
            width: 300,
            animCollapse: true,
            collapsible: true,
            collapseDirection: Ext.Component.DIRECTION_LEFT,
            height: '100%',
            title: 'Education',
            frame: true,
            layoutConfig: {columns: 3},
            items: [
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Education',
                    defaultType: 'checkboxfield',
                    items: [
                        {
                            boxLabel: 'school',
                            name: 'education',
                            inputValue: '1',
                            id: 'checkbox1'
                        }, {
                            boxLabel: 'college',
                            name: 'education',
                            inputValue: '2',
                            checked: true,
                            id: 'checkbox2'
                        }, {
                            boxLabel: 'University',
                            name: 'education',
                            inputValue: '3',
                            id: 'checkbox3'
                        }
                    ]
                }
            ],
            bbar: [
                {
                    text: 'Select All',
                    handler: function () {
                        var checkbox1 = Ext.getCmp('checkbox1'),
                            checkbox2 = Ext.getCmp('checkbox2'),
                            checkbox3 = Ext.getCmp('checkbox3');

                        checkbox1.setValue(true);
                        checkbox2.setValue(true);
                        checkbox3.setValue(true);
                    }
                },
                {
                    text: 'Deselect All',
                    handler: function () {
                        var checkbox1 = Ext.getCmp('checkbox1'),
                            checkbox2 = Ext.getCmp('checkbox2'),
                            checkbox3 = Ext.getCmp('checkbox3');

                        checkbox1.setValue(false);
                        checkbox2.setValue(false);
                        checkbox3.setValue(false);
                    }
                }
            ]
        });

        var citySelectForm = new Ext.form.Panel({

            bodyPadding: 10,
            width: 300,
            animCollapse: true,
            collapsible: true,
            collapseDirection: Ext.Component.DIRECTION_LEFT,
            height: '100%',
            title: 'City',
            frame: true,
            layoutConfig: {columns: 3},
            items: [
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'City',
                    defaultType: 'checkboxfield',
                    items: [
                        {
                            boxLabel: 'Mexico',
                            name: 'city',
                            inputValue: '1',
                            id: 'checkbox4'
                        }, {
                            boxLabel: 'Vitebsk',
                            name: 'city',
                            inputValue: '2',
                            checked: true,
                            id: 'checkbox5'
                        }, {
                            boxLabel: 'Ulaanbaator',
                            name: 'city',
                            inputValue: '3',
                            id: 'checkbox6'
                        }
                    ]
                }
            ],
            bbar: [
                {
                    text: 'Select All',
                    handler: function () {
                        var checkbox4 = Ext.getCmp('checkbox4'),
                            checkbox5 = Ext.getCmp('checkbox5'),
                            checkbox6 = Ext.getCmp('checkbox6');

                        checkbox4.setValue(true);
                        checkbox5.setValue(true);
                        checkbox6.setValue(true);
                    }
                },
                {
                    text: 'Deselect All',
                    handler: function () {
                        var checkbox1 = Ext.getCmp('checkbox1'),
                            checkbox2 = Ext.getCmp('checkbox2'),
                            checkbox3 = Ext.getCmp('checkbox3');

                        checkbox1.setValue(false);
                        checkbox2.setValue(false);
                        checkbox3.setValue(false);
                    }
                }
            ]
        });

        var entityPanel = new Ext.Panel({
            layout: {
                type: 'hbox',
                align: 'auto',
                padding: 5
            },
            closable: false,
            resizable: true,
            draggable: false,
            modal: true,
            items: [educationSelectForm, citySelectForm, personPanel],
            renderTo: Ext.getBody()
        });
    }

/*
        Ext.create('Ext.form.Panel', {
            title: 'Simple Form',
            bodyPadding: 5,
            width: 350,
            url: 'Person/ajax',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            params: {requestTime: true },
            buttons: [{
                text: 'Submit',
                formBind: true, //only enabled once the form is valid
                disabled: true,
                handler: function() {
                    var form = this.up('form').getForm();
                    if (form.isValid()) {
                        form.submit({
                            success: function(form, response) {
                                var timeIs = response.result;
                                Ext.Msg.alert('Success','this is the time'+timeIs['some_parameter'], timeIs.success);
                            },
                            failure: function(form) {
                                Ext.Msg.alert('Failed', 'action.result.msg');
                            }
                        });
                    }
                }
            }],
            renderTo: Ext.getBody()
        });
        */


});


/*
Ext.onReady(function(){
    // Define our data model
    Ext.define('Employee', {
        extend: 'Ext.data.Model',
        fields: [
            'name',
            'education',
             'city'

            /*
            'email',
            { name: 'start', type: 'date', dateFormat: 'n/j/Y' },
            { name: 'salary', type: 'float' },
            { name: 'active', type: 'bool' }
        */
/*
        ]
    });

    // Generate mock employee data
    var data = (function() {
        var lasts = ['Jones', 'Smith', 'Lee', 'Wilson', 'Black', 'Williams', 'Lewis', 'Johnson', 'Foot', 'Little', 'Vee', 'Train', 'Hot', 'Mutt'],
            firsts = ['Fred', 'Julie', 'Bill', 'Ted', 'Jack', 'John', 'Mark', 'Mike', 'Chris', 'Bob', 'Travis', 'Kelly', 'Sara'],
            lastLen = lasts.length,
            firstLen = firsts.length,
            usedNames = {},
            data = [],
            eDate = Ext.Date,
            now = new Date(),
            s = new Date(now.getFullYear() - 4, 0, 1),
            end = Ext.Date.subtract(now, Ext.Date.MONTH, 1),
            getRandomInt = Ext.Number.randomInt,

            generateName = function() {
                var name = firsts[getRandomInt(0, firstLen - 1)] + ' ' + lasts[getRandomInt(0, lastLen - 1)];
                if (usedNames[name]) {
                    return generateName();
                }
                usedNames[name] = true;
                return name;
            };


        while (s.getTime() < end) {
            var ecount = getRandomInt(0, 3);
            for (var i = 0; i < ecount; i++) {
                var name = generateName();
                data.push({
                   // start : eDate.add(eDate.clearTime(s, true), eDate.DAY, getRandomInt(0, 27)),
                    name : name,
                    education:'school',
                    city: 'Berlin'
                    //email: name.toLowerCase().replace(' ', '.') + '@sencha-test.com',
                    //active: getRandomInt(0, 1),
                    //salary: Math.floor(getRandomInt(35000, 85000) / 1000) * 1000
                });
            }
            s = eDate.add(s, eDate.MONTH, 1);
        }


        return data;
    })();

    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        model: 'Employee',
        proxy: {
            type: 'memory'
        },
        data: data,
        sorters: [{
            property: 'start',
            direction: 'DESC'
        }]
    });

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

    // create the grid and specify what field you want
    // to use for the editor at each column.
    var grid = Ext.create('Ext.grid.Panel', {
        store: store,
        columns: [{
            header: 'Name',
            dataIndex: 'name',
            flex: 1,
            editor: {
                // defaults to textfield if no xtype is supplied
                allowBlank: false
            }
        }, {
            header: 'Education',
            dataIndex: 'education',
            width: 160,
            editor: {
                allowBlank: false
                //vtype: 'email'
            }
        },{
            header: 'City',
            dataIndex: 'city',
            width: 160
            /*
            editor: {
                allowBlank: false
                //vtype: 'email'
            }*/
/*
        }
        */
            /*,{
            xtype: 'datecolumn',
            header: 'Start Date',
            dataIndex: 'start',
            width: 135,
            editor: {
                xtype: 'datefield',
                allowBlank: false,
                format: 'm/d/Y',
                minValue: '01/01/2006',
                minText: 'Cannot have a start date before the company existed!',
                maxValue: Ext.Date.format(new Date(), 'm/d/Y')
            }
        }, {
            xtype: 'numbercolumn',
            header: 'Salary',
            dataIndex: 'salary',
            format: '$0,0',
            width: 130,
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 1,
                maxValue: 150000
            }
        }, {
            xtype: 'checkcolumn',
            header: 'Active?',
            dataIndex: 'active',
            width: 60,
            editor: {
                xtype: 'checkbox',
                cls: 'x-grid-checkheader-editor'
            }
        }
        */
/*
        ],
        tbar: [{
            text: 'Add Employee',
            iconCls: 'employee-add',
            handler : function() {
                rowEditing.cancelEdit();

                // Create a model instance
                var r = Ext.create('Employee', {
                    name: 'New Guy',
                    education:'school',
                    city:'Berlin'

                    //email: 'new@sencha-test.com',
                    //start: Ext.Date.clearTime(new Date()),
                    //salary: 50000,
                    //active: true

                });

                store.insert(0, r);
                rowEditing.startEdit(0, 0);
            }
        }, {
            itemId: 'removeEmployee',
            text: 'Remove Employee',
            iconCls: 'employee-remove',
            handler: function() {
                var sm = grid.getSelectionModel();
                rowEditing.cancelEdit();
                store.remove(sm.getSelection());
                if (store.getCount() > 0) {
                    sm.select(0);
                }
            },
            disabled: true
        }],
        plugins: [rowEditing],
        listeners: {
            'selectionchange': function(view, records) {
                grid.down('#removeEmployee').setDisabled(!records.length);
            }
        }
    });
    new Ext.window.Window({
        width: 700,
        height: 400,
        title: 'Employee',
        items: grid,
        layout: 'fit',
        closable: false
    }).show();
});
*/
