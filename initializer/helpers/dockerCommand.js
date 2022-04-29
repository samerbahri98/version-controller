const dockerCommand = ({ Cmd, gitContainer }) =>
	new Promise(async (resolve, reject) => {
		gitContainer
			.exec({
				Cmd,
				AttachStdin: true,
				AttachStdout: true,
				AttachStderr: true,
			})
			.then((err, exec) => {
				if (err) reject(err);
				exec
					.start({ hijack: true, stdin: true, stdout: true, stderr: true })
					.then((err, stream) => {
						if (err) reject(err);
						resolve(
							docker.modem.demuxStream(steam, process.stdout, process.stderr)
						);
					});
			});
	});

module.exports={dockerCommand}