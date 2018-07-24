'use strict';

const _ = require('lodash');
const createEnvelope = require('../xml').createEnvelope;
const errorNotImplemented = require('./index').errorNotImplemented;

const arr = (collection) => _.compact(_.isArray(collection) ? collection : [collection]);

const _POST_PRODUCT_DATA_ = createEnvelope(function (header, data) {
    return {
        MerchantIdentifier: header.MerchantIdentifier,
        MessageType: 'Product',
        Message: _.map(arr(data), (m) => ({
            MessageID: m.MessageID,
            OperationType: m.OperationType,
            Product: _.map(arr(m.Product), (product) => ({
                SKU:                    product.SKU,

                StandardProductID: _.map(arr(product.StandardProductID), (standardproductid) => ({
                    Type:                   standardproductid.Type,
                    Value:                  standardproductid.Value
                })),

                LaunchDate:             product.LaunchDate,
                ReleaseDate:            product.ReleaseDate,

                Condition: _.map(arr(product.Condition), (condition) => ({
                    ConditionType:          condition.ConditionType,
                    ConditionNote:          condition.ConditionNote
                })),

                ItemPackageQuantity:    product.ItemPackageQuantity,
                NumberOfItems:          product.NumberOfItems,

                DescriptionData: _.map(arr(product.DescriptionData), (descriptiondata) => ({
                    Title:                      descriptiondata.Title,
                    Brand:                      descriptiondata.Brand,
                    Designer:                   descriptiondata.Designer,
                    Description:                descriptiondata.Description,

                    BulletPoint:                descriptiondata.BulletPoint,

                    MSRP:                       descriptiondata.MSRP,

                    Manufacturer:               descriptiondata.Manufacturer,
                    MfrPartNumber:              descriptiondata.MfrPartNumber,

                    RecommendedBrowseNode:      descriptiondata.RecommendedBrowseNode,

                    MerchantShippingGroupName:  descriptiondata.MerchantShippingGroupName
                })),

                ProductData: (product.ProductData ? product.ProductData : '')
            }))
        }))

    };
});

const _POST_INVENTORY_AVAILABILITY_DATA_ = createEnvelope(function (header, data) {
    return {
        MerchantIdentifier: header.MerchantIdentifier,
        MessageType: 'Inventory',
        Message: _.map(arr(data), (m) => ({
            MessageID: m.MessageID,
            OperationType: m.OperationType,
            Inventory: _.map(arr(m.Inventory), (inventory_item) => ({
                SKU:                    inventory_item.SKU,
                Quantity:               inventory_item.Quantity,
                FulfillmentLatency:     inventory_item.FulfillmentLatency,
                SwitchFulfillmentTo:    inventory_item.SwitchFulfillmentTo
            }))
        }))
    };
});

const _POST_PRODUCT_OVERRIDES_DATA_ = errorNotImplemented('_POST_PRODUCT_OVERRIDES_DATA_');

const _POST_PRODUCT_PRICING_DATA_ = createEnvelope(function (header, data) {
    return {
        MerchantIdentifier: header.MerchantIdentifier,
        MessageType: 'Price',
        Message: _.map(arr(data), (m) => ({
            MessageID: m.MessageID,
            OperationType: m.OperationType,
            Price: _.map(arr(m.Price), (price_item) => ({
                SKU:            price_item.SKU,
                StandardPrice:  {
                    '@': {
                        currency:   price_item.StandardPrice.currency
                    },
                    '_': price_item.StandardPrice.value
                },
                Sale: _.map(arr(price_item.Sale), (sale) => ({
                    StartDate:  sale.StartDate,
                    EndDate:    sale.EndDate,
                    SalePrice: {
                        '@': {
                            currency: sale.SalePrice.currency
                        },
                        '_': sale.SalePrice.value
                    }
                }))
            }))
        }))
    };
});

const _POST_PRODUCT_IMAGE_DATA_ = createEnvelope(function (header, data) {
    return {
        MerchantIdentifier: header.MerchantIdentifier,
        MessageType: 'Product',
        Message: _.map(arr(data), (m) => ({
            MessageID: m.MessageID,
            OperationType: m.OperationType,
            ProductImage: _.map(arr(m.ProductImage), (productImage) => ({
                SKU:                    productImage.SKU,

                ImageType:              productImage.ImageType,
                ImageLocation:          productImage.ImageLocation
            }))
        }))
    };
});


const _POST_PRODUCT_RELATIONSHIP_DATA_ = errorNotImplemented('_POST_PRODUCT_RELATIONSHIP_DATA_');
const _POST_FLAT_FILE_INVLOADER_DATA_ = errorNotImplemented('_POST_FLAT_FILE_INVLOADER_DATA_');
const _POST_FLAT_FILE_LISTINGS_DATA_ = errorNotImplemented('_POST_FLAT_FILE_LISTINGS_DATA_');
const _POST_FLAT_FILE_BOOKLOADER_DATA_ = errorNotImplemented('_POST_FLAT_FILE_BOOKLOADER_DATA_');
const _POST_FLAT_FILE_CONVERGENCE_LISTINGS_DATA_ = errorNotImplemented('_POST_FLAT_FILE_CONVERGENCE_LISTINGS_DATA_');
// const _POST_FLAT_FILE_LISTINGS_DATA_ = errorNotImplemented('____________');
const _POST_FLAT_FILE_PRICEANDQUANTITYONLY_UPDATE_DATA_ = errorNotImplemented('_POST_FLAT_FILE_PRICEANDQUANTITYONLY_UPDATE_DATA_');
const _POST_UIEE_BOOKLOADER_DATA_ = errorNotImplemented('_POST_UIEE_BOOKLOADER_DATA_');
const _POST_STD_ACES_DATA_ = errorNotImplemented('_POST_STD_ACES_DATA_');

module.exports = {
    _POST_PRODUCT_DATA_,
    _POST_INVENTORY_AVAILABILITY_DATA_,
    _POST_PRODUCT_OVERRIDES_DATA_,
    _POST_PRODUCT_PRICING_DATA_,
    _POST_PRODUCT_IMAGE_DATA_,
    _POST_PRODUCT_RELATIONSHIP_DATA_,
    _POST_FLAT_FILE_INVLOADER_DATA_,
    _POST_FLAT_FILE_LISTINGS_DATA_,
    _POST_FLAT_FILE_BOOKLOADER_DATA_,
    _POST_FLAT_FILE_CONVERGENCE_LISTINGS_DATA_,
    // _POST_FLAT_FILE_LISTINGS_DATA_,
    _POST_FLAT_FILE_PRICEANDQUANTITYONLY_UPDATE_DATA_,
    _POST_UIEE_BOOKLOADER_DATA_,
    _POST_STD_ACES_DATA_
};
