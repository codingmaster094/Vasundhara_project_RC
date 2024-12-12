import dotenv from 'dotenv'
dotenv.config()
import Client from 'ssh2-sftp-client'
const sftp = new Client()

const configsftp = {
    host: process.env.FTP_HOST,
    port: process.env.FTP_PORT,
    username: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD,
}

const SftpConnection = sftp.connect(configsftp)

const UploadImage = async function (file, path, imagename) {
    try {
        var Extension = file.name.split(".")
        var Filename = imagename + "_" + Date.now() + "." + Extension[Extension.length - 1]
        var destinationPath = process.env.FTP_PATH + process.env.DO_SFTP_FOLDER + path + "/" + Filename
        if (SftpConnection) {
            const pathData = sftp.put(file.data, destinationPath)
            const Uploadpath = process.env.DO_SFTP_BASE_URL + process.env.DO_SFTP_FOLDER + path + "/" + Filename
            return { status: true, path: Uploadpath, msg: "Upload Image Successfully.." }
        } else {
            sftp.end()
            console.log(err.message)
            return { status: false, msg: err.message }
        }
    } catch (error) {
        return catchError(error.message)
    }
}

const DeleteImage = async function (imagelink, path) {
    try {
        const Filename = imagelink.split("/")
        const destinationPath = process.env.FTP_PATH + process.env.DO_SFTP_FOLDER + path + "/" + Filename[Filename.length - 1]
        if (SftpConnection) {
            const pathData = sftp.delete(destinationPath)
            return { status: true, msg: "Image Delete Successfully.." }
        } else {
            sftp.end()
            console.log(err.message)
            return { status: false, msg: err.message }
        }
    } catch (error) {
        return catchError(error.message)
    }
}

const catchError = (msg) => {
    return({
        status:false,
        response_code:400,
        response_message:msg
    })
}

const findError = (msg) => {
    return({
        status:false,
        response_code:404,
        response_message:msg
    })
}

const requiredError = (msg) => {
    return({
        status:false,
        response_code:400,
        response_message:msg
    })
}

const successResponse = (msg) => {
    return({
        status:true,
        response_code:200,
        response_message:msg
    })
}

const dataResponse = (msg,data) => {
    return({
        status:true,
        response_code:200,
        response_message:msg,
        data:data
    })
}

const AuthError = (msg) => {
    return({
        status:false,
        response_code:429,
        response_message:msg
    })
}

const ForbiddenError = (msg) => {
    return({
        status:false,
        response_code:429,
        response_message:msg
    })
}

export default {catchError,findError,requiredError, successResponse, dataResponse, AuthError, ForbiddenError, UploadImage, DeleteImage }