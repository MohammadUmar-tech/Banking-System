import { transactionModel } from "../models/transaction.model.js";
import { accountModel } from "../models/account.model.js";
import { ledgerModel } from "../models/ledger.model.js"; 
import mongoose from "mongoose"

import { sendEmailController } from "../services/email.js";


export const createTransaction=async (req,res)=>{

    const {fromAccount,toAccount,amount,idempotencyKey}=req.body

    if(!fromAccount||!toAccount||!amount||!idempotencyKey){
          return res.status(400).json({
            message: "FromAccount, toAccount, amount and idempotencyKey are required"
        })
    }

    
    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount,
    })

    const toUserAccount = await accountModel.findOne({
        _id: toAccount,
    })

        if (!fromUserAccount || !toUserAccount) {
        return res.status(400).json({
            message: "Invalid fromAccount or toAccount"
        })
    }

    const isTransactionAlreadyExists = await transactionModel.findOne({
        idempotencyKey: idempotencyKey
    })

    if (isTransactionAlreadyExists) {
        if (isTransactionAlreadyExists.status === "COMPLETED") {
            return res.status(200).json({
                message: "Transaction already processed",
                transaction: isTransactionAlreadyExists
            })

        }

        if (isTransactionAlreadyExists.status === "PENDING") {
            return res.status(200).json({
                message: "Transaction is still processing",
            })
        }

        if (isTransactionAlreadyExists.status === "FAILED") {
            return res.status(500).json({
                message: "Transaction processing failed, please retry"
            })
        }

        if (isTransactionAlreadyExists.status === "REVERSED") {
            return res.status(500).json({
                message: "Transaction was reversed, please retry"
            })
        }
    }




    if (fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE") {
        return res.status(400).json({
            message: "Both fromAccount and toAccount must be ACTIVE to process transaction"
        })
    }

    const balance=await fromUserAccount.getBalance()
    if (balance < amount) {
        return res.status(400).json({
            message: `Insufficient balance. Current balance is ${balance}. Requested amount is ${amount}`
        })
    }

    const session=await mongoose.startSession()
    session.startTransaction()

    const transaction=await transactionModel.create({
        fromAccount,
        toAccount,
        amount,
        idempotencyKey,
        status:"PENDING"
    },{session})

    const debitLedgerEntry=await ledgerModel.create([{
        account:fromAccount,
        amount:amount,
        transaction:transaction._id,
        type:"DEBIT"
    }],{session})

    const creditLedgerEntry=await ledgerModel.create([{
        account:toAccount,
        amount:amount,
        transaction:transaction._id,
        type:"CREDIT"
    }],{session})


    transaction.status="COMPLETED",
    await transaction.save({session})

    await session.commitTransaction()
    session.endSession()
    const user=req.user;
    await sendEmailController({user,amount,fromAccount,toAccount})
    return res.status(200).json({message:`Email sent successfully`})
}


export const createInitialFundsTransaction=async (req,res)=>{
    const {toAccount,amount,idempotencyKey}=req.body

    if(!toAccount||!amount||!idempotencyKey){
          return res.status(400).json({
            message: "toAccount, amount and idempotencyKey are required"
        })
    }

    const toUserAccount=await accountModel.findOne({_id:toAccount})
    if(!toUserAccount){

    }

     if (!toUserAccount) {
        return res.status(400).json({
            message: "Invalid toAccount"
        })
    }
    const fromUserAccount=await accountModel.findOne({
        user:req.user?._id
    })

    console.log("FromUserAccount",fromUserAccount);
    if (!fromUserAccount) {
        return res.status(400).json({
            message: "System user account not found"
        })
    }
    const session =await mongoose.startSession()
    session.startTransaction()


    const transaction=new transactionModel({
        fromAccount:fromUserAccount._id,
        toAccount,
        amount,
        status:"PENDING",
        idempotencyKey
    })


    const debitLedgerEntry=await ledgerModel.create([{

        account:fromUserAccount._id,
        amount:amount,
        transaction:transaction._id,
        type:'DEBIT'
    }],{session})

    const creditLedgerEntryLedgerEntry=await ledgerModel.create([{

        account:toAccount,
        amount:amount,
        transaction:transaction._id,
        type:'CREDIT'
    }],{session})

    transaction.status="COMPLETED"
    await transaction.save({session})

    await session.commitTransaction()
    session.endSession()
    const user=req.user;
    
await sendEmailController({user, amount, fromAccount:fromUserAccount._id, toAccount})
     return res.status(201).json({
        message: "Initial funds transaction completed successfully",
        transaction: transaction
    })


}