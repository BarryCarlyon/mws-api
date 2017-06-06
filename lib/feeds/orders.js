'use strict';

const _ = require('lodash');
const createEnvelope = require('../xml').createEnvelope;
const errorNotImplemented = require('./index').errorNotImplemented;

const arr = (collection) => _.compact(_.isArray(collection) ? collection : [collection]);

const _POST_ORDER_ACKNOWLEDGEMENT_DATA_ = createEnvelope(function (header, data) {
    return {
        MerchantIdentifier: header.MerchantIdentifier,
        MessageType: 'OrderAcknowledgement',
        Message: _.map(arr(data), (m) => ({
            MessageID: m.MessageID,
            OrderAcknowledgement: {
                AmazonOrderID: m.AmazonOrderID,
                MerchantOrderID: m.MerchantOrderID,
                StatusCode: m.StatusCode,
                Item: _.map(arr(m.Item), (item) => ({
                    AmazonOrderItemCode: item.AmazonOrderItemCode,
                    MerchantOrderItemID: item.MerchantOrderItemID,
                    CancelReason: item.CancelReason
                }))
            }
        }))

    };
});

const _POST_PAYMENT_ADJUSTMENT_DATA_ = createEnvelope(function (header, data) {
    return {
        MerchantIdentifier: header.MerchantIdentifier,
        MessageType: 'OrderAdjustment',
        Message: _.map(arr(data), (m) => ({
            MessageID: m.MessageID,
            OrderAdjustment: {
                AmazonOrderID: m.AmazonOrderID,
                MerchantOrderID: m.MerchantOrderID,
                ActionType: m.ActionType,

                AdjustedItem: _.map(arr(m.AdjustedItem), (adjustedItem) => ({
                    AmazonOrderItemCode: adjustedItem.AmazonOrderItemCode,
                    MerchantOrderItemID: adjustedItem.MerchantOrderItemID,
                    MerchantAdjustmentItemID: adjustedItem.MerchantAdjustmentItemID,
                    AdjustmentReason: adjustedItem.AdjustmentReason,

                    ItemPriceAdjustments: {
                        Component: _.map(arr(adjustedItem.ItemPriceAdjustments.Component), (itemPriceAdjustment) => ({
                            Type: itemPriceAdjustment.Type,
                            Amount: {
                                '@': {
                                    'currency': itemPriceAdjustment.Amount.currency
                                },
                                '_': itemPriceAdjustment.Amount.Value,
                            }
                        }))
                    },

                    PromotionAdjustments: _.map(arr(adjustedItem.PromotionAdjustments), (promotionAdjustment) => ({
                        PromotionClaimCode: promotionAdjustment.PromotionClaimCode,
                        MerchantPromotionID: promotionAdjustment.MerchantPromotionID,
                        Component: _.map(arr(adjustedItem.PromotionAdjustments.Component), (promotionAdjustmentComponent) => ({
                            Type: promotionAdjustmentComponent.Type,
                            Amount: {
                                '@': {
                                    'currency': promotionAdjustmentComponent.Amount.currency
                                },
                                '_': promotionAdjustmentComponent.Amount.Value,
                            }
                        }))
                    })),

                    QuantityCancelled: adjustedItem.QuantityCancelled,
                    Quantity: adjustedItem.Quantity
                }))
            }
        }))
    }
});

/*

*/

const _POST_ORDER_FULFILLMENT_DATA_ = createEnvelope(function (header, data) {
    return {
        MerchantIdentifier: header.MerchantIdentifier,
        MessageType: 'OrderFulfillment',
        Message: _.map(arr(data), (m) => ({
            MessageID: m.MessageID,
            OrderFulfillment: {
                AmazonOrderID: m.AmazonOrderID,
                MerchantOrderID: m.MerchantOrderID,
                MerchantFulfillmentID: m.MerchantFulfillmentID,
                FulfillmentDate: m.FulfillmentDate,
                FulfillmentData: {
                    CarrierCode: m.CarrierCode,
                    CarrierName: m.CarrierName,
                    ShippingMethod: m.ShippingMethod,
                    ShipperTrackingNumber: m.ShipperTrackingNumber
                },
                Item: _.map(arr(m.Item), (item) => ({
                    AmazonOrderItemCode: item.AmazonOrderItemCode,
                    MerchantOrderItemID: item.MerchantOrderItemID,
                    MerchantFulfillmentItemID: item.MerchantFulfillmentItemID,
                    Quantity: item.Quantity
                }))
            }
        }))
    };
});

const _POST_INVOICE_CONFIRMATION_DATA_ = errorNotImplemented('_POST_INVOICE_CONFIRMATION_DATA_');
const _POST_FLAT_FILE_ORDER_ACKNOWLEDGEMENT_DATA_ = errorNotImplemented('_POST_FLAT_FILE_ORDER_ACKNOWLEDGEMENT_DATA_');
const _POST_FLAT_FILE_PAYMENT_ADJUSTMENT_DATA_ = errorNotImplemented('_POST_FLAT_FILE_PAYMENT_ADJUSTMENT_DATA_');
const _POST_FLAT_FILE_FULFILLMENT_DATA_ = errorNotImplemented('_POST_FLAT_FILE_FULFILLMENT_DATA_');
const _POST_FLAT_FILE_INVOICE_CONFIRMATION_DATA_ = errorNotImplemented('_POST_FLAT_FILE_INVOICE_CONFIRMATION_DATA_');

module.exports = {
    _POST_ORDER_ACKNOWLEDGEMENT_DATA_,
    _POST_PAYMENT_ADJUSTMENT_DATA_,
    _POST_ORDER_FULFILLMENT_DATA_,
    _POST_INVOICE_CONFIRMATION_DATA_,
    _POST_FLAT_FILE_ORDER_ACKNOWLEDGEMENT_DATA_,
    _POST_FLAT_FILE_PAYMENT_ADJUSTMENT_DATA_,
    _POST_FLAT_FILE_FULFILLMENT_DATA_,
    _POST_FLAT_FILE_INVOICE_CONFIRMATION_DATA_
};
