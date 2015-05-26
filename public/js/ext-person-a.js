Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.form.*'
]);

var cityArr = [],
    educationArr = [];

var personStore = Ext.create('Ext.data.JsonStore', {
    fields: ['personName', 'education', 'city'],
    pageSize: 10,
    proxy: {
        type: 'ajax',
        url: 'Person/ajax',
        reader: {
            type: 'json',
            root: 'persons'
        }
    }
});
personStore.load();

var checkboxcont = function (fieldLbl, checkboxArr) {
    Ext.create('Ext.form.Panel', {
            fieldLabel: fieldLbl,
            defaultType: 'checkboxgroup',
            items: [function () {
                var items = '';
                for (x in checkboxArr) {
                    items = items + '{' +
                    'boxlabel:' + fieldLbl + ',' +
                    'name:' + x + ',' +
                    'inputValue:' + x + ',' +
                    '},';
                }
                return items.substring(0, items.length - 1);
            }]
        }
    );
};

var cityEducationSelectors = Ext.create('Ext.form.FormPanel', {
    id: 'cityEducationFilter',
    url: 'Person/ajax',
    //handler:'' ,
    items: [checkboxcont('Cities',cityArr),checkboxcont('Education',educationArr)],
    buttons: [{
        text: 'Filter',
        handler: function(){
            Ext.getCmp('cityEducationFilter').getForm.submit({
                success: function(form,action){},
                failure: function(form,action) {
                    Ext.msg.alert(action.result.msg);
                }
            });
        }
    }]
});

var personTable = Ext.create('Ext.panel', {
    title: 'Persons by education and cities',
    store: personStore,
    columns: [
        {text: 'Person\'s name', dataIndex: 'personName'},
        {text: 'Education', dataIndex: 'education'},
        {text: 'Cities', dataIndex: 'city'}
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: personStore,
        dock: 'bottom',
        displayInfo: true,
        displayMsg: 'Shown {0} - {1} from {2}'
    }]
});



var personTableAndFilter = Ext.create('Ext.panel', {
    width: '100%',
    height: '100%',
    title: 'Persons',
    layout: {
        type: 'hbox',
        align: 'stretchmax'
    },
    items: [{
        xtype: 'panel',
        flex: 1,
        items: [cityEducationSelectors],
        loader: {
            url: 'Person/ajax', //for example
            autoLoad: true
        }
    }, {
        xtype: 'panel',
        flex: 2,
        items: [personTable]
    }],
    renderTo: Ext.getBody()//document.body
});

personTableAndFilter.show();
debugger;
var editor = Ext.create('Ext.grid.plugin.CellEditing');